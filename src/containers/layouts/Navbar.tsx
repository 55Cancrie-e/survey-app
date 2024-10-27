import { Logo, NavButton, NavImage, NavbarWrapper } from "./Navbar.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeAnswer, setCurrentQuestionId } from "@/store/surveySlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface NavbarProps {
    theme: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({theme}) => {
    const [hideButton, setHideButton] = useState<boolean>(false);
    const answers = useSelector((state: RootState) => state.survey.answers);
    const currentQuestionId = useSelector((state: RootState) => state.survey.currentQuestionId);
    const firstQuestionId = useSelector((state: RootState) => state.survey.firstQuestionId);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        setHideButton(currentQuestionId === firstQuestionId);
    }, [currentQuestionId, firstQuestionId]);

    const handleBackClick = () => {
        const answerIds = Object.keys(answers);
        if (answerIds.length > 0) {
            const lastAnsweredId = answerIds[answerIds.length - 1];

            if (currentQuestionId && answers[currentQuestionId]) {
                dispatch(removeAnswer(currentQuestionId));
                const removeId = answerIds.slice(0, -1);
                router.push(`/survey/${removeId[removeId.length - 1]}`);
            } else {
                dispatch(setCurrentQuestionId(lastAnsweredId));
                router.push(`/survey/${lastAnsweredId}`);
            }
        }
    };


    return (
        <NavbarWrapper>
            <div>
            <NavButton hidden={hideButton} onClick={() => handleBackClick()}><NavImage src={theme === 'light' ? '/arrow_left.svg' : '/arrow_left_white.svg'} alt="arrowRight" width={30} height={20}/></NavButton>
            </div>
            <Logo><NavImage src={theme === 'light' ? '/logo.svg' : '/logo_white.svg'} alt="logo" width={24} height={24}/></Logo>
        </NavbarWrapper>
    )
};


export default Navbar;