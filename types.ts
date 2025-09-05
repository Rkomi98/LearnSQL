
export interface ParsedFeedback {
  verdict: string;
  lineByLine: string;
  improvedCode: string;
  explanation: string;
  glossary: string;
  task: string;
  quiz: string;
  reward: string;
  nextStep: string;
}

export interface UserProfileData {
  cacaoBeans: number;
  badges: string[];
}
