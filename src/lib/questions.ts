import { Question } from '../types/question';
import questions from '../questions.json';

export const fetchQuestions = (): Question[] => {
  return questions as Question[];
};

export const fetchQuestionById = (
  id: string | string[] | undefined,
): Question | undefined => {
  if (typeof id === 'string') {
    return questions.find((q) => q.id === id) as Question;
  }
  return undefined;
};
