import { AuthenticationService } from './authentication.service';
import { FileService } from './storage/file.service';
import { HttpService } from './http.service';
import { LiveKitService } from './livekit.service';
import { NgModule } from '@angular/core';
import { ProfileService } from './profile.service';
import { UploadService } from './upload.service';

@NgModule({
  providers: [AuthenticationService, HttpService, UploadService, ProfileService, FileService, LiveKitService],
})
export class ServiceModule {}
