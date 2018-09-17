import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadQuestionImageService {
  FOLDER = 'question-images/img001/';
  constructor() { }
  uploadfile(file) {
    console.log(file)
    var filename = file.name;
    var testSubFolder =  filename.split('.').slice(0, -1).join('.')
    this.FOLDER = 'question-images/' + testSubFolder + '/'

    const bucket = new S3(
      {
        accessKeyId: 'AKIAIZYXLF44I7734MEA',
        secretAccessKey: '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',
        region: 'ap-south-1'
      }
    );

    const params = {
      Bucket: 'www.examchain.in',
      Key: (this.FOLDER) + file.name,
      Body: file
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
