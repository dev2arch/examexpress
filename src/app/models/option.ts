export class Option {
    id: number;
    questionId: number;
    name: string;
    answer: boolean;
    selected: boolean;
  optionImage: string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.answer = data.answer;
        this.optionImage =  data.optionImage;
    }
}
