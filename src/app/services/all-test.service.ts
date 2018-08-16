import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {AppConfig} from '../app.config';

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
            data[i].type = 'free'
            console.log(data[i].category)
            if (allCat.indexOf(data[i].category) < 0) {
              allCat.push(data[i].category)
            }
          }
          data.category  = allCat;
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
          for (var i in data){

            data[i].type = 'free'
          }
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

}
