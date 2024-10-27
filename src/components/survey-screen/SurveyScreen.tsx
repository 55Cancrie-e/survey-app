import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Question } from '@/types/question';
import { displayText } from '@/lib/displayText';
import { Button, QuestionBlock, QuestionButtonWrapper, QuestionSubText, QuestionText, ResultListItem } from './SurveyScreen.styled';
import { resetSurvey } from '@/store/surveySlice';
import { useRouter } from 'next/router';

const useSurveyData = () => {
  return useSelector((state: RootState) => ({
    answers: state.survey.answers,
    questions: state.survey.questions,
  }));
};

interface SurveyScreenProps {
  question: Question;
  handleAnswer: (answer: string) => void;
  currentAnswer: string;
}

const AnswerButton: React.FC<{ option: string; isActive: boolean; onClick: () => void }> = React.memo(({ option, isActive, onClick }) => (
  <Button active={isActive} onClick={onClick}>{option}</Button>
));
AnswerButton.displayName = "AnswerButton";

const SingleChoiceQuestion: React.FC<SurveyScreenProps> = ({ question, handleAnswer, currentAnswer }) => {
  const { answers, questions } = useSurveyData();
  return ( 
    <QuestionBlock>
      <QuestionText>{displayText(question.text, answers, questions)}</QuestionText>
      {question.subText && (<QuestionSubText style={{ marginTop: '10px' }}>{question.subText}</QuestionSubText>)}
      <QuestionButtonWrapper>
        {(question.options ?? []).map((option) => (
          <AnswerButton key={option} option={option} isActive={currentAnswer === option} onClick={() => handleAnswer(option)} />
        ))}
      </QuestionButtonWrapper>
    </QuestionBlock>
)};

const TextInputQuestion: React.FC<SurveyScreenProps> = ({ question }) => {
  const { answers, questions } = useSurveyData();

  return (
    <QuestionBlock>
      <QuestionText>{displayText(question.text, answers, questions)}</QuestionText>
      <input type="text" placeholder="Type your answer" />
    </QuestionBlock>
)};

const DateInputQuestion: React.FC<SurveyScreenProps> = ({ question }) => {
  const { answers, questions } = useSurveyData();

  return (
    <QuestionBlock>
      <QuestionText>{displayText(question.text, answers, questions)}</QuestionText>
      <input type="date" />
    </QuestionBlock>
)};

const InfoQuestion: React.FC<SurveyScreenProps> = ({ question, handleAnswer }) => {
  const { answers, questions } = useSurveyData();

  return (
    <QuestionBlock>
      <QuestionText>{displayText(question.text, answers, questions)}</QuestionText>
      {question.subText && <QuestionSubText>{question.subText}</QuestionSubText>}
      <QuestionButtonWrapper>
        {(question.options ?? []).map((option) => (
          <Button onClick={() => handleAnswer('')} key={option}>{option}</Button>
        ))}
      </QuestionButtonWrapper>
    </QuestionBlock>
)};

const ResultScreen: React.FC<SurveyScreenProps> = ({ question }) => {
  const { answers, questions } = useSurveyData();
  const dispatch = useDispatch();
  const router = useRouter();
  const resetTest = () => {
    const firstQuestionId = questions[0].id;
    dispatch(resetSurvey());
    router.push(`/survey/${firstQuestionId}`)
  }
  return (
      <QuestionBlock>
        <QuestionText>{displayText(question.text, answers, questions)}</QuestionText>
        <ul>
          {Object.entries(answers).map(([questionId, answer]) => {
            const question = questions.find((q) => q.id === questionId);
            return (
              <ResultListItem key={questionId}>
                <strong>{question?.text || `Question ${questionId}`}:</strong> {answer}
              </ResultListItem>
            );
          })}
        </ul>
        <Button onClick={() => resetTest()}>Restart Text</Button>
      </QuestionBlock>
  );
};

const SurveyScreen: React.FC<SurveyScreenProps> = (props) => {
  const renderQuestion = () => {
    switch (props.question.screenType) {
      case 'single-choice':
        return <SingleChoiceQuestion {...props} />;
      case 'text-input':
        return <TextInputQuestion {...props} />;
      case 'date-input':
        return <DateInputQuestion {...props} />;
      case 'info':
        return <InfoQuestion {...props} />;
      case 'result':
        return <ResultScreen {...props} />;
      default:
        return <QuestionText>Unknown question type</QuestionText>;
    }
  };

  return renderQuestion();
};

export default SurveyScreen;

