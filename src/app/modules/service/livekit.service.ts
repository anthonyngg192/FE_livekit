import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  ExternalE2EEKeyProvider,
  LocalParticipant,
  LocalTrackPublication,
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoPresets,
} from 'livekit-client';
@Injectable()
export class LiveKitService {
  private currentRoom: Room;

  constructor() {}

  elementMapping: { [k: string]: MediaDeviceKind } = {
    'video-input': 'videoinput',
    'audio-input': 'audioinput',
    'audio-output': 'audiooutput',
  };

  state = {
    isFrontFacing: false,
    encoder: new TextEncoder(),
    decoder: new TextDecoder(),
    defaultDevices: new Map<MediaDeviceKind, string>(),
    bitrateInterval: undefined as any,
    e2eeKeyProvider: new ExternalE2EEKeyProvider(),
  };

  roomEventListener() {
    this.currentRoom
      .on(RoomEvent.TrackSubscribed, this.handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed)
      .on(RoomEvent.ActiveSpeakersChanged, this.handleActiveSpeakerChange)
      .on(RoomEvent.Disconnected, this.handleDisconnect)
      .on(RoomEvent.LocalTrackUnpublished, this.handleLocalTrackUnpublished);
  }

  async initRoom() {
    this.currentRoom = new Room({
      adaptiveStream: true,

      // optimize publishing bandwidth and CPU for published tracks
      dynacast: true,

      // default capture settings
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    });
  }

  preConnect(token: string) {
    this.currentRoom.prepareConnection(environment.ws, token);
  }

  async roomConnect(token: string) {
    await this.currentRoom.connect(environment.ws, token);
  }

  async publicLocalCameraAndMic() {
    await this.currentRoom.localParticipant.enableCameraAndMicrophone();
  }

  handleTrackSubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) {
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const element = track.attach();
      // parentElement.appendChild(element);
    }
  }

  handleTrackUnsubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) {
    track.detach();
  }

  handleLocalTrackUnpublished(publication: LocalTrackPublication, participant: LocalParticipant) {
    publication.track.detach();
  }

  handleActiveSpeakerChange(speakers: Participant[]) {
    //
    console.log(speakers);
  }

  handleDisconnect() {
    console.log('disconnected from room');
  }

  async handleDeviceSelected(e: Event) {
    const deviceId = (e.target as HTMLSelectElement).value;
    const elementId = (e.target as HTMLSelectElement).id;
    const kind = this.elementMapping[elementId];
    if (!kind) {
      return;
    }

    this.state.defaultDevices.set(kind, deviceId);

    if (this.currentRoom) {
      await this.currentRoom.switchActiveDevice(kind, deviceId);
    }
  }
  async handleDevicesChanged() {
    Promise.all(
      Object.keys(this.elementMapping).map(async (id) => {
        const kind = this.elementMapping[id];
        if (!kind) {
          return;
        }
        await Room.getLocalDevices(kind);
      }),
    );
  }
}
