import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {AppConfig} from '../app.config';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AllTestService {
  res;

  constructor(private http: Http) {
  }

  public getAllTests() {
    var url = AppConfig.API_ENDPOINT + '/quizzard/test';
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json()
          var allCat = []
          for (var i in data) {
            console.log(data[i].category)
            if (allCat.indexOf(data[i].category) < 0) {
              allCat.push(data[i].category)
            }
          }
          data.category  = allCat
          return data;
        }
      )
  }

  public getAllTestsByCat(cat) {
    var url = AppConfig.API_ENDPOINT + '/quizzard/test?category=' + cat;
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json()
          return data;
        }
      )
  }

  public addTestDetails(testDetails) {


    var url = AppConfig.API_ENDPOINT + '/quizzard/test'
    var dataToPost = testDetails;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', AppConfig.CURR_USER.token);
    return this.http.post(url, (dataToPost), {headers: headers})
      .map(
        (response: Response) => { this.res = response; console.log("success", response)},
        error => console.log(error, "error in adding Test")
      )
  }
  public addQuestionstemp(event, testCode) {
    var url = AppConfig.API_ENDPOINT + '/quizzard/test/' + testCode
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
       headers.append('Content-Type', 'multipart/form-data');
      headers.append('Authorization', AppConfig.CURR_USER.token);
      // let options = new RequestOptions({ headers: headers });
      return this.http.post(url, formData, {headers})
        .map(res => res.json())
        .catch(error => Observable.throw(error))
    }
  }
  public addQuestions(data, testCode) {


    var url = AppConfig.API_ENDPOINT + '/quizzard/test/' + testCode
    var dataToPost = data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', AppConfig.CURR_USER.token);
    return this.http.post(url, (dataToPost), {headers: headers})
      .map(
        (response: Response) => { this.res = response; console.log("success", response)},
        error => console.log(error, "error in adding Test")
      )
  }

}
