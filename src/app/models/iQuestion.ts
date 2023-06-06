export interface Question {
  _id: string;
  category: string;
  question: string;
  answers: {
    [key: string]: { [key: string]: number }[];
  };
}
