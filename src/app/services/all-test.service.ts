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
    var url = AppConfig.API_ENDPOINT + '/quizzard/test/' + testCode +'/questions'
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
       formData.append('file', file, file.name);
      let headers = new Headers();
      headers.append('Authorization', AppConfig.CURR_USER.token);
      return this.http.post(url, formData, {headers})
        .map(res =>{res.json(),console.log(res)})
        .catch(error => Observable.throw(error))
    }
  }


}
