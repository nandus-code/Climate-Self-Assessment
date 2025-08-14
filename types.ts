export interface CompanyProfile {
  userName: string;
  userRole: string;
  userPhone: string;
  userEmail: string;
  companyName: string;
  industry: string;
  companySize: string;
  primaryGoal: string;
  currentClimateInitiatives: string;
  timeframe: string;
  geographicScope: string;
}

export interface QuestionOption {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
  helpText: string;
  maxPoints: number;
  isMultiSelect?: boolean;
}

export interface AssessmentSection {
  id:string;
  title: string;
  description: string;
  maxPoints: number;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  points: number;
  selectedOptionText: string;
}

export interface MultiSelectAnswer {
    questionId: string;
    points: number;
    selectedOptions: string[];
}

export type SectionAnswers = (Answer | MultiSelectAnswer)[];

export interface Answers {
  [key: string]: SectionAnswers;
}

export interface SectionScore {
  rawScore: number;
  maxScore: number;
  percentage: number;
}

export interface Scores {
  [key: string]: SectionScore;
  total: SectionScore;
}

export type AppStep = 'profile' | 'assessment' | 'results';

export interface ReadinessLevel {
  level: string;
  color: string;
  textColor: string;
  description: string;
}

export interface ActionPlan {
    immediateActions: string[];
    shortTermActions: string[];
    longTermActions: string[];
    priorityAreas: string[];
    industrySpecificRecommendations: string[];
    goalSpecificRecommendations: string[];
}