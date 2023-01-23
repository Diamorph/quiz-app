export interface IQuizListDTO {
  quizList: IQuizListDTOItem[];
}

export interface IQuizListDTOItem {
  id: string;
  name: string;
}

export interface IQuiz {
  id: string;
  name: string;
  time: number;
  questions: IQuizQuestion[];
}

export interface IQuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  answers?: string[];
  correctAnswer: string | string[];
}

export enum QuizQuestionType {
  singleChoice = 'single-choice',
  multiChoice = 'multi-choice',
  textInput = 'text-input',
  numberInput = 'number-input'
}


