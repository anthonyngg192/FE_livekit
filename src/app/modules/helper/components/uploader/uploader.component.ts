import * as _ from 'lodash';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileType } from '../../constants/file-type.enum';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadService } from 'src/app/modules/service/upload.service';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.less'],
})
export class UploaderComponent {
  @Output() onChange = new EventEmitter<string[]>();
  @Input() upData = {};
  @Input() upListType = 'picture-card';
  @Input() upShowButton = true;
  @Input() showUploadList = true;
  @Input() upFileType = '';
  @Input() acceptType = '';
  upFileList: NzUploadFile[] = [];
  previewImage = '';
  previewVisible = false;
  previewVideo = '';
  thumbnailVideo = 'assets/images/video-thumbnail.png';
  images: string[] = [
    FileType.IMAGE_JPEG,
    FileType.IMAGE_BMP,
    FileType.IMAGE_JPG,
    FileType.IMAGE_PNG,
    FileType.IMAGE_GIF,
    FileType.IMAGE_SVG,
  ];
  videos: string[] = [FileType.VIDEO_MP4];

  @Input() beforeUpload = () => true;

  constructor(private uploadService: UploadService) {}

  onFileListChange(data: { file: NzUploadFile; fileList: NzUploadFile[] }) {
    const { file, fileList } = data;
    switch (file.status) {
      case 'removed':
        this.upFileList = this.upFileList.filter((f) => f.url !== file.url);
        this.onChange.emit(this.upFileList.map((f) => f.url));
        break;

      case 'done':
        const filePathData = [];
        if (fileList.length) {
          fileList.forEach((item) => {
            if (this.isVideo(item.url)) {
              item.url =
                item.response && item.response.data && item.response.data.length
                  ? item.response.data[0].fullPath
                  : item.thumbUrl;
              item.thumbUrl = this.thumbnailVideo;
            }
            if (item.url) {
              filePathData.push(item.url);
            } else if (item.response && item.response.data && item.response.data.length) {
              item.response.data.forEach((fileData) => {
                filePathData.push(fileData.fullPath);
              });
            }
          });
        }
        this.onChange.emit(filePathData);
        break;
    }
  }

  customUpload = (file: any) => this.uploadService.uploadFile(file);

  @Input()
  set fileList(value: string[]) {
    value = value || [];
    this.upFileList = value.map((x) => {
      const file: NzUploadFile = {
        url: x,
        status: 'done',
        thumbUrl: null,
        uid: null,
        name: null,
        type: null,
        size: 0,
      };
      if (this.isVideo(file.url)) {
        file.thumbUrl = this.thumbnailVideo;
      }

      return file;
    });
    this.upFileList.forEach((file) => {
      if (this.isVideo(file.url)) {
        file.thumbUrl = this.thumbnailVideo;
      }
    });
  }

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = '';
    this.previewVideo = '';

    if (this.isImage(file)) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    }

    if (this.isVideo(file.url)) {
      this.previewVideo = file.url;
      this.previewVisible = true;
    }
  };

  isImage(file: NzUploadFile) {
    return (file.url && this.images.includes(file.url.split('.').pop())) || (file.type && file.type.includes('image'));
  }

  isVideo(file: string) {
    return file && _.isString(file) && this.videos.includes(file.split('.').pop());
  }

  onCancel() {
    this.previewImage = '';
    this.previewVideo = '';
    this.previewVisible = false;
  }
}
