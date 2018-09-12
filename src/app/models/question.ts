import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    questionTypeCode: string;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.questionTypeCode = data.questionType.questionTypeCode;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
