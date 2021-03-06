import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import {ActivatedRoute} from '@angular/router';
import {AppConfig} from "../app.config";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizes: any[];
  imgPath:string
  quiz: Quiz = new Quiz(null);
  mode: string = 'quiz';
  quizName: string;
  testID:string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private quizService: QuizService, private activatedRoutes: ActivatedRoute) {
    this.quizName = this.activatedRoutes.snapshot.params['id']
    this.imgPath = AppConfig.IMG_ENDPOINT+this.quizName;

  }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.loadQuiz(this.quizName);
    // alert(status);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName)
    .subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length; console.log("quiz>>>>>>", this.quiz)
    });
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeCode == 'MCQ') {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }

    if (question.marked) {
      question.marked = false
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
  markedForLater(index: number ) {
    // question.marked = true;
    this.quiz.questions[index - 1].marked = true;
    console.log(this.quiz.questions[index])
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(index) {
    return this.quiz.questions[index].options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };
  ismarked(index) {
     return this.quiz.questions[index].marked === true ? 'Marked' : 'Not Answered';
  };
  check(e) {
    alert("hi")
    console.log(e)
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.answer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'QuizId': this.quiz.id, 'QuestionId': x.id, 'Answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    this.mode = 'result';
  }
}
