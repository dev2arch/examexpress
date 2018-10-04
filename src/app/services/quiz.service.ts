import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AppConfig} from "../app.config";

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(testID: string) {
    var headers = new Headers();
    var url = AppConfig.API_ENDPOINT + "/quizzard/test/"+testID+"?includeQuestions=true"
    // alert(url)
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', AppConfig.CURR_USER.token);
    console.log("quiz called")
    //return this.http.get("http://13.126.208.177:8080/quizzard/test/"+testID+"?includeQuestions=true", {headers: headers})
    return this.http.get(url, {headers: headers})
    .map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

}
