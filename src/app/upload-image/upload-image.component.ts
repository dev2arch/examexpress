import { Component, OnInit } from '@angular/core';
import {UploadQuestionImageService} from "../services/upload-question-image.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  selectedFiles: FileList;
  constructor(private uploadService: UploadQuestionImageService) { }

  ngOnInit() {
  }

  // upload() {
  //   const file = this.selectedFiles.item(0);
  //   this.uploadService.uploadfile(file);
  // }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
