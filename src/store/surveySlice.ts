import { Question } from '@/types/question';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyState {
  questions: Question[];
  answers: Record<string, string>; 
  currentQuestionId: string | null; 
  firstQuestionId: string | null
}

const initialState: SurveyState = {
  questions: [],
  answers: {},
  currentQuestionId: null,
  firstQuestionId: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.currentQuestionId = action.payload[0].id;
      state.firstQuestionId = action.payload[0].id;
    },
    saveAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setCurrentQuestionId: (state, action: PayloadAction<string | null>) => {
      state.currentQuestionId = action.payload;
    },
    removeAnswer: (state, action: PayloadAction<string>) => {
      delete state.answers[action.payload];
      const answerIds = Object.keys(state.answers);
      state.currentQuestionId = answerIds[answerIds.length - 1];
      
  },
    resetSurvey: (state) => {
      state.answers = {};
      state.currentQuestionId = state.questions[0].id;
    },
  },
});

export const { setQuestions, saveAnswer, setCurrentQuestionId, removeAnswer, resetSurvey } = surveySlice.actions;

export default surveySlice.reducer;
