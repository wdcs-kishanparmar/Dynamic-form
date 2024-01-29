export interface Form {
  id: string;
  formName: string;
  formURL: string;
  createdAt: number;
}

export interface FormData {
  formName: string;
  createdAt: string;
  formURL: string;
  questions: Array<{
    title: string;
    answerType: string;
    choices?: string[];
  }>;
}
export interface FormField {
  title: string;
  answerType: string;
  choices?: any;
  isRequired?: boolean;
}

export interface FormChoice {
  label: string;
  value: any;
  choice: string;
}

export interface FormPageProps {
  params: {
    formURL: string;
  };
}
export interface Question {
  title: string;
  answerType: string;
  choices?: string[];
  isRequired: boolean;
}
