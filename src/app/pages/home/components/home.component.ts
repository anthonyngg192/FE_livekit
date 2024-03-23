import { AccountModel } from 'src/app/models/iam/account.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/modules/service/session.service';
/* eslint-disable @typescript-eslint/indent */
import {
  ConnectionQuality,
  ConnectionState,
  DisconnectReason,
  LocalAudioTrack,
  LocalParticipant,
  MediaDeviceFailure,
  Participant,
  ParticipantEvent,
  RemoteParticipant,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  ScreenSharePresets,
  Track,
  TrackPublication,
  VideoPresets,
  createAudioAnalyser,
} from 'livekit-client';
@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: AccountModel;

  audioInputs: MediaDeviceInfo[] = [];
  audioOutputs: MediaDeviceInfo[] = [];
  videoInputs: MediaDeviceInfo[] = [];

  startTime: number;

  @ViewChild('videoEle') el: ElementRef;
  currentRoom: Room | undefined;

  constructor(
    private sessionService: SessionService,
    private elementRef: ElementRef,
  ) {
    this.currentUser = this.sessionService.currentUser;
    const a = Room.getLocalDevices();
  }

  async ngOnInit() {
    const localDevices = await Room.getLocalDevices();
    // type MediaDeviceKind = 'audioinput' | 'audiooutput' | 'videoinput';
    this.videoInputs = localDevices.filter((x) => x.kind === 'videoinput');
    this.audioInputs = [...localDevices.filter((x) => x.kind === 'audioinput')];
    this.audioOutputs = localDevices.filter((x) => x.kind === 'audiooutput');
    await this.connectRoom();
  }

  renderScreenShare(room: Room) {
    const div = this.el.nativeElement;
    if (room.state !== ConnectionState.Connected) {
      div.style.display = 'none';
      return;
    }
    let participant: Participant | undefined;
    let screenSharePub: TrackPublication | undefined = room.localParticipant.getTrackPublication(
      Track.Source.ScreenShare,
    );
    let screenShareAudioPub: RemoteTrackPublication | undefined;
    if (!screenSharePub) {
      room.remoteParticipants.forEach((p) => {
        if (screenSharePub) {
          return;
        }
        participant = p;
        const pub = p.getTrackPublication(Track.Source.ScreenShare);
        if (pub?.isSubscribed) {
          screenSharePub = pub;
        }
        const audioPub = p.getTrackPublication(Track.Source.ScreenShareAudio);
        if (audioPub?.isSubscribed) {
          screenShareAudioPub = audioPub;
        }
      });
    } else {
      participant = room.localParticipant;
    }

    if (screenSharePub && participant) {
      div.style.display = 'block';
      const videoElm = this.el.nativeElement as HTMLVideoElement;
      screenSharePub.videoTrack?.attach(videoElm);
      if (screenShareAudioPub) {
        screenShareAudioPub.audioTrack?.attach(videoElm);
      }
      videoElm.onresize = () => {
        this.updateVideoSize(videoElm, this.el.nativeElement as HTMLSpanElement);
      };
      const infoElm = this.el.nativeElement;
      infoElm.innerHTML = `Screen share from ${participant.identity}`;
    } else {
      div.style.display = 'none';
    }
  }

  updateVideoSize(element: HTMLVideoElement, target: HTMLElement) {
    target.innerHTML = `(${element.videoWidth}x${element.videoHeight})`;
  }

  async shareScreen() {
    if (!this.currentRoom) return;

    const enabled = this.currentRoom.localParticipant.isScreenShareEnabled;
    try {
      await this.currentRoom.localParticipant.setScreenShareEnabled(!enabled, { audio: true });
    } catch (e) {
      // appendLog('error sharing screen', e);
    }
  }

  async connectRoom() {
    const roomOptions = {
      autoSubscribe: true,
      rtcConfig: 'relay',
    };

    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      audioOutput: {
        deviceId: this.audioOutputs[0].deviceId,
      },
      publishDefaults: {
        simulcast: true,
        videoSimulcastLayers: [VideoPresets.h90, VideoPresets.h216],
        videoCodec: 'vp8',
        dtx: true,
        red: true,
        forceStereo: false,
        screenShareEncoding: ScreenSharePresets.h1080fps30.encoding,
      },
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    });

    this.startTime = Date.now();
    await room.prepareConnection(environment.ws, '');

    const prewarmTime = Date.now() - this.startTime;
    console.log(`prewarmed connection in ${prewarmTime}ms`);

    room
      .on(RoomEvent.ParticipantConnected, this.participantConnected)
      .on(RoomEvent.ParticipantDisconnected, this.participantDisconnected)
      .on(RoomEvent.DataReceived, this.handleData)
      .on(RoomEvent.Disconnected, this.handleRoomDisconnect)
      .on(RoomEvent.Reconnecting, () => console.log('Reconnecting to room'))
      .on(RoomEvent.Reconnected, async () => {
        console.log('Successfully reconnected. server', await room.engine.getConnectedServerAddress());
      })
      .on(RoomEvent.LocalTrackPublished, (pub) => {
        const track = pub.track as LocalAudioTrack;

        if (track instanceof LocalAudioTrack) {
          const { calculateVolume } = createAudioAnalyser(track);

          setInterval(() => {
            const localVolume = this.elementRef.nativeElement.querySelector('#local-volume');
            if (localVolume) {
              localVolume.setAttribute('value', calculateVolume().toFixed(4));
            }
          }, 200);
        }
        this.renderParticipant(room.localParticipant);
        this.updateButtonsForPublishState();
        this.renderScreenShare(room);
      })
      .on(RoomEvent.LocalTrackUnpublished, () => {
        this.renderParticipant(room.localParticipant);
        this.updateButtonsForPublishState();
        this.renderScreenShare(room);
      })
      .on(RoomEvent.RoomMetadataChanged, (metadata) => {
        console.log('new metadata for room', metadata);
      })
      .on(RoomEvent.MediaDevicesChanged, this.handleDevicesChanged)
      .on(RoomEvent.AudioPlaybackStatusChanged, () => {
        const startAudio = this.elementRef.nativeElement.querySelector('#start-audio-button');
        if (room.canPlaybackAudio) {
          const _ = startAudio ? startAudio.setAttribute('disabled', 'true') : null;
        } else {
          const _ = startAudio ? startAudio.removeAttribute('disabled') : null;
        }
      })
      .on(RoomEvent.MediaDevicesError, (e: Error) => {
        const failure = MediaDeviceFailure.getFailure(e);
        console.log('media device failure', failure);
      })
      .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
        console.log('connection quality changed', participant?.identity, quality);
      })
      .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
        console.log('subscribed to track', pub.trackSid, participant.identity);
        this.renderParticipant(participant);
        this.renderScreenShare(room);
      })
      .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
        console.log('unsubscribed from track', pub.trackSid);
        this.renderParticipant(participant);
        this.renderScreenShare(room);
      })
      .on(RoomEvent.SignalConnected, async () => {
        const signalConnectionTime = Date.now() - this.startTime;
        console.log(`signal connection established in ${signalConnectionTime}ms`);
        // speed up publishing by starting to publish before it's fully connected
        // publishing is accepted as soon as signal connection has established
        await room.localParticipant.enableCameraAndMicrophone();
        console.log(`tracks published in ${Date.now() - this.startTime}ms`);
        this.updateButtonsForPublishState();
      })
      .on(RoomEvent.ParticipantEncryptionStatusChanged, () => {
        this.updateButtonsForPublishState();
      })
      .on(RoomEvent.TrackStreamStateChanged, (pub, streamState, participant) => {
        console.log(`stream state changed for ${pub.trackSid} (${participant.identity}) to ${streamState.toString()}`);
      });

    try {
      // read and set current key from input

      await room.connect(environment.ws, '', {
        autoSubscribe: true,
        rtcConfig: {
          iceTransportPolicy: 'relay',
        },
      });
      const elapsed = Date.now() - this.startTime;
      console.log(
        `successfully connected to ${room.name} in ${Math.round(elapsed)}ms`,
        await room.engine.getConnectedServerAddress(),
      );
    } catch (error: any) {
      let message: any = error;
      if (error.message) {
        message = error.message;
      }
      console.log('could not connect:', message);
      return;
    }

    this.currentRoom = room;
    this.setButtonsForState(true);

    room.remoteParticipants.forEach((participant) => {
      this.participantConnected(participant);
    });
    this.participantConnected(room.localParticipant);

    return room;
  }

  setButtonsForState(connected: boolean) {
    const connectedSet = [
      'toggle-video-button',
      'toggle-audio-button',
      'share-screen-button',
      'disconnect-ws-button',
      'disconnect-room-button',
      'flip-video-button',
      'send-button',
    ];
    if (this.currentRoom && this.currentRoom.options.e2ee) {
      connectedSet.push('toggle-e2ee-button', 'e2ee-ratchet-button');
    }
    const disconnectedSet = ['connect-button'];

    const toRemove = connected ? connectedSet : disconnectedSet;
    const toAdd = connected ? disconnectedSet : connectedSet;

    toRemove.forEach((id) => this.elementRef.nativeElement.querySelector(`#${id}`)?.removeAttribute('disabled'));
    toAdd.forEach((id) => this.elementRef.nativeElement.querySelector(`#${id}`)?.setAttribute('disabled', 'true'));
  }

  participantConnected(participant: Participant) {
    console.log('participant', participant.identity, 'connected', participant.metadata);
    console.log('tracks', participant.trackPublications);
    participant
      .on(ParticipantEvent.TrackMuted, (pub: TrackPublication) => {
        console.log('track was muted', pub.trackSid, participant.identity);
        this.renderParticipant(participant);
      })
      .on(ParticipantEvent.TrackUnmuted, (pub: TrackPublication) => {
        console.log('track was unmuted', pub.trackSid, participant.identity);
        this.renderParticipant(participant);
      })
      .on(ParticipantEvent.IsSpeakingChanged, () => {
        this.renderParticipant(participant);
      })
      .on(ParticipantEvent.ConnectionQualityChanged, () => {
        this.renderParticipant(participant);
      });
  }

  renderParticipant(participant: Participant, remove: boolean = false) {
    const container = this.elementRef.nativeElement.querySelector('#participants-area');
    console.log(container);
    if (!container) return;
    const { identity } = participant;

    let div = this.elementRef.nativeElement.querySelector(`#participant-${identity}`);
    if (!div && !remove) {
      div = document.createElement('div');
      div.id = `participant-${identity}`;
      div.className = 'participant';
      div.innerHTML = `
        <video id="video-${identity}"></video>
        <audio id="audio-${identity}"></audio>
        <div class="info-bar">
          <div id="name-${identity}" class="name">
          </div>
          <div style="text-align: center;">
            <span id="codec-${identity}" class="codec">
            </span>
            <span id="size-${identity}" class="size">
            </span>
            <span id="bitrate-${identity}" class="bitrate">
            </span>
          </div>
          <div class="right">
            <span id="signal-${identity}"></span>
            <span id="mic-${identity}" class="mic-on"></span>
            <span id="e2ee-${identity}" class="e2ee-on"></span>
          </div>
        </div>
        ${
          participant instanceof RemoteParticipant
            ? `<div class="volume-control">
          <input id="volume-${identity}" type="range" min="0" max="1" step="0.1" value="1" orient="vertical" />
        </div>`
            : '<progress id="local-volume" max="1" value="0" />'
        }

      `;
      container.appendChild(div);

      const sizeElm = this.elementRef.nativeElement.querySelector(`#size-${identity}`);
      const videoElm_a = this.elementRef.nativeElement.querySelector(`#video-${identity}`) as HTMLVideoElement;
      // videoElm_a.onresize = () => {
      //   // updateVideoSize(videoElm_a, sizeElm);
      // };
    }
    const videoElm = this.elementRef.nativeElement.querySelector(`#video-${identity}`) as HTMLVideoElement;
    const audioELm = this.elementRef.nativeElement.querySelector(`#video-${identity}`) as HTMLAudioElement;
    if (remove) {
      div?.remove();
      if (videoElm) {
        videoElm.srcObject = null;
        videoElm.src = '';
      }
      if (audioELm) {
        audioELm.srcObject = null;
        audioELm.src = '';
      }
      return;
    }

    // update properties
    this.elementRef.nativeElement.querySelector(`#name-${identity}`).innerHTML = participant.identity;
    if (participant instanceof LocalParticipant) {
      this.elementRef.nativeElement.querySelector(`#name-${identity}`).innerHTML += ' (you)';
    }
    const micElm = this.elementRef.nativeElement.querySelector(`#mic-${identity}`);
    const signalElm = this.elementRef.nativeElement.querySelector(`#signal-${identity}`);
    const cameraPub = participant.getTrackPublication(Track.Source.Camera);
    const micPub = participant.getTrackPublication(Track.Source.Microphone);
    if (participant.isSpeaking) {
      div.classList.add('speaking');
    } else {
      div.classList.remove('speaking');
    }

    if (participant instanceof RemoteParticipant) {
      const volumeSlider = this.elementRef.nativeElement.querySelector(`#volume-${identity}`) as HTMLInputElement;
      volumeSlider.addEventListener('input', (ev) => {
        participant.setVolume(Number.parseFloat((ev.target as HTMLInputElement).value));
      });
    }

    const cameraEnabled = cameraPub && cameraPub.isSubscribed && !cameraPub.isMuted;
    if (cameraEnabled) {
      if (participant instanceof LocalParticipant) {
        // flip
        videoElm.style.transform = 'scale(-1, 1)';
      } else if (!cameraPub?.videoTrack?.attachedElements.includes(videoElm)) {
        const renderStartTime = Date.now();
        // measure time to render
        videoElm.onloadeddata = () => {
          const elapsed = Date.now() - renderStartTime;
          let fromJoin = 0;
          if (participant.joinedAt && participant.joinedAt.getTime() < this.startTime) {
            fromJoin = Date.now() - this.startTime;
          }
          console.log(
            `RemoteVideoTrack ${cameraPub?.trackSid} (${videoElm.videoWidth}x${videoElm.videoHeight}) rendered in ${elapsed}ms`,
            fromJoin > 0 ? `, ${fromJoin}ms from start` : '',
          );
        };
      }
      cameraPub?.videoTrack?.attach(videoElm);
    } else {
      // clear information display
      this.elementRef.nativeElement.querySelector(`#size-${identity}`).innerHTML = '';
      if (cameraPub?.videoTrack) {
        // detach manually whenever possible
        cameraPub.videoTrack?.detach(videoElm);
      } else {
        videoElm.src = '';
        videoElm.srcObject = null;
      }
    }

    const micEnabled = micPub && micPub.isSubscribed && !micPub.isMuted;
    if (micEnabled) {
      if (!(participant instanceof LocalParticipant)) {
        // don't attach local audio
        audioELm.onloadeddata = () => {
          if (participant.joinedAt && participant.joinedAt.getTime() < this.startTime) {
            const fromJoin = Date.now() - this.startTime;
            console.log(`RemoteAudioTrack ${micPub?.trackSid} played ${fromJoin}ms from start`);
          }
        };
        micPub?.audioTrack?.attach(audioELm);
      }
      micElm.className = 'mic-on';
      micElm.innerHTML = '<i class="fas fa-microphone"></i>';
    } else {
      micElm.className = 'mic-off';
      micElm.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    }

    switch (participant.connectionQuality) {
      case ConnectionQuality.Excellent:
      case ConnectionQuality.Good:
      case ConnectionQuality.Poor:
        signalElm.className = `connection-${participant.connectionQuality}`;
        signalElm.innerHTML = '<i class="fas fa-circle"></i>';
        break;
      default:
        signalElm.innerHTML = '';
      // do nothing
    }
  }

  participantDisconnected(participant: RemoteParticipant) {
    console.log('participant', participant.sid, 'disconnected');

    this.renderParticipant(participant, true);
  }

  handleRoomDisconnect(reason?: DisconnectReason) {
    if (!this.currentRoom) return;
    console.log('disconnected from room', { reason });
    this.setButtonsForState(false);
    this.renderParticipant(this.currentRoom.localParticipant, true);
    this.currentRoom.remoteParticipants.forEach((p) => {
      this.renderParticipant(p, true);
    });
    this.renderScreenShare(this.currentRoom);

    const container = this.elementRef.nativeElement.querySelector('#participants-area');
    if (container) {
      container.innerHTML = '';
    }

    // clear the chat area on disconnect
    const chat = this.elementRef.nativeElement.querySelector('#chat') as HTMLTextAreaElement;
    chat.value = '';

    this.currentRoom = undefined;
    // window.currentRoom = undefined;
  }

  handleData(msg: Uint8Array, participant?: RemoteParticipant) {
    const decoder = new TextDecoder();
    console.log(decoder.decode(msg));
  }

  async handleDevicesChanged() {
    //TODO
  }

  updateButtonsForPublishState() {
    if (!this.currentRoom) {
      return;
    }
    const lp = this.currentRoom.localParticipant;

    // video
    this.setButtonState(
      'toggle-video-button',
      `${lp.isCameraEnabled ? 'Disable' : 'Enable'} Video`,
      lp.isCameraEnabled,
    );

    // audio
    this.setButtonState(
      'toggle-audio-button',
      `${lp.isMicrophoneEnabled ? 'Disable' : 'Enable'} Audio`,
      lp.isMicrophoneEnabled,
    );

    // screen share
    this.setButtonState(
      'share-screen-button',
      lp.isScreenShareEnabled ? 'Stop Screen Share' : 'Share Screen',
      lp.isScreenShareEnabled,
    );

    // e2ee
    this.setButtonState(
      'toggle-e2ee-button',
      `${this.currentRoom.isE2EEEnabled ? 'Disable' : 'Enable'} E2EE`,
      this.currentRoom.isE2EEEnabled,
    );
  }
  setButtonState(buttonId: string, buttonText: string, isActive: boolean, isDisabled: boolean | undefined = undefined) {
    const el = this.elementRef.nativeElement.querySelector(`#${buttonId}`) as HTMLButtonElement;
    if (!el) return;
    if (isDisabled !== undefined) {
      el.disabled = isDisabled;
    }
    el.innerHTML = buttonText;
    if (isActive) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}
