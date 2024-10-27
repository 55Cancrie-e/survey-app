export type QuestionAnswerType = string | number | string[] | number[];

export interface Question {
    id: string;
    text: string;
    subText?: string;
    theme: 'light' | 'dark';
    nextInfo?: string;
    screenType: 'single-choice' | 'text-input' | 'date-input' | 'info' | 'result';
    dynamicKey?: string;
    options?: string[]; 
    next: Partial<Record<string, string>>;
}

export type Survey = Question[];
