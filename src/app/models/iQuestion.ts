import {Answer} from "./iAnswer";

export interface Question {
  _id: string;
  category: string;
  question: string;
  answers: Answer[];
}
