import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { saveAnswer, setCurrentQuestionId } from '@/store/surveySlice';
import { Question } from '@/types/question';
import { fetchQuestionById, fetchQuestions } from '@/lib/questions';
import { useRouter } from 'next/router';
import { RootState } from '@/store';
import SurveyScreen from '@/components/survey-screen/SurveyScreen';
import Layout from '@/containers/layouts/Layout';

interface SurveyPageProps {
    question: Question;
}

const SurveyPage: NextPage<SurveyPageProps> = ({ question }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const answers = useSelector((state: RootState) => state.survey.answers);
  const currentAnswer = answers[question.id];

  const findLastNonInfoQuestion = () => {
    const answerIds = Object.keys(answers);
    for (let i = answerIds.length - 1; i >= 0; i--) {
      const questionId = answerIds[i];
      const questionData = fetchQuestionById(questionId);
      if (questionData && questionData.screenType !== 'info') {
        return questionData.next[answers[questionId]];
      }
    }
    return null;
  };

  const handleAnswer = (answer: string) => {
    let nextQuestionId;
    if (question.screenType === 'info') {
      nextQuestionId = findLastNonInfoQuestion();
    } else {
      dispatch(saveAnswer({ questionId: question.id, answer }));
      if(question.nextInfo) {
        nextQuestionId = question.nextInfo;
      } else {
        nextQuestionId = question.next[answer] as string;
      }
    }
    if (nextQuestionId) {
      router.push(`/survey/${nextQuestionId}`);
      dispatch(setCurrentQuestionId(nextQuestionId));
    }
  };

  return (
  <Layout theme={question.theme}>
    <SurveyScreen question={question} handleAnswer={handleAnswer} currentAnswer={currentAnswer} />
  </Layout>);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const questions = await fetchQuestions();
  const paths = questions.map((question: Question) => ({
    params: { questionId: question.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const questionId = context.params?.questionId;
  const question = await fetchQuestionById(questionId);

  return { props: { question } };
};

export default SurveyPage;
