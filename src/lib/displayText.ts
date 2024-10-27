import { Question } from "@/types/question";

export const displayText = (text: string, answers: Record<string, string>, questions: Question[]) => {
  const dynamicValues = questions.reduce<Record<string, string>>((acc, question) => {
    if (question.dynamicKey && answers[question.id]) {
      acc[question.dynamicKey] = answers[question.id];
    }
    return acc;
  }, {});

  return text.replace(/{([^{}()]+)(?:\s\(if\s(.+?)\))?}/g, (_, key, conditionKey) => {
    if (conditionKey) {
      if (dynamicValues[conditionKey] && dynamicValues[conditionKey] !== "Yes") {
        return '';
      } else {
        return key || '';
      }
    }
    const keyLowerCase = key.toLowerCase();
    const value = dynamicValues[keyLowerCase];
    return value || '';
  });
};