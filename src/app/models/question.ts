import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    questionTypeCode: string;
    options: Option[];
    answered: boolean;
    questionImg: string;

    constructor(data: any) {
        data = data || {};
        this.name = data.name;
        this.id = data.id;
        this.questionTypeId = data.questionTypeId;
        this.questionTypeCode = data.questionType.questionTypeCode;
        this.questionImg = data.questionImage;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
