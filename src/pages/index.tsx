import { Button, QuestionBlock, QuestionButtonWrapper, QuestionText } from "@/components/survey-screen/SurveyScreen.styled";
import Layout from "@/containers/layouts/Layout";
import { fetchQuestions } from "@/lib/questions";
import { setQuestions } from "@/store/surveySlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    const fetchedQuestions = await fetchQuestions();
    const firstQuestionId = fetchedQuestions[0].id;
    dispatch(setQuestions(fetchedQuestions));
    router.push(`/survey/${firstQuestionId}`)

  };
  return (
    <Layout theme={'light'}>
      <QuestionBlock>
        <QuestionText>Welcome to the test</QuestionText>
        <QuestionButtonWrapper>
          <Button onClick={handleClick}>Start the test</Button>
        </QuestionButtonWrapper>
      </QuestionBlock>
    </Layout>
  );
}
