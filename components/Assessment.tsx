import React from 'react';
import { AssessmentSection as AssessmentSectionType, SectionAnswers, Answer, MultiSelectAnswer } from '../types';
import QuestionnaireSection from './QuestionnaireSection';
import ProgressBar from './ProgressBar';
import { BackIcon, NextIcon, RD_ICON, HumanCapitalIcon, EcosystemIcon, ImplementationIcon, RiskIcon, BusinessModelIcon } from './Icons';

interface AssessmentProps {
  sections: AssessmentSectionType[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: SectionAnswers };
  onAnswer: (sectionId: string, answer: Answer | MultiSelectAnswer) => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  onComplete: () => void;
  totalProgress: number;
  industryExamples: string[];
}

const SECTION_ICONS: { [key: string]: React.ElementType } = {
  section1: RD_ICON,
  section2: HumanCapitalIcon,
  section3: EcosystemIcon,
  section4: ImplementationIcon,
  section5: RiskIcon,
  section6: BusinessModelIcon,
};

const Assessment: React.FC<AssessmentProps> = ({ sections, currentSectionIndex, currentQuestionIndex, answers, onAnswer, onNavigate, onComplete, totalProgress, industryExamples }) => {
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const currentAnswers = answers[currentSection.id] || [];
  const currentAnswer = currentAnswers.find(a => a.questionId === currentQuestion.id);
  const isQuestionAnswered = !!currentAnswer;

  const handleAnswer = (answer: Answer | MultiSelectAnswer) => {
    onAnswer(currentSection.id, answer);
  };
  
  const SectionIcon = SECTION_ICONS[currentSection.id] || null;
  
  const isLastQuestionOfAssessment = currentSectionIndex === sections.length - 1 && currentQuestionIndex === currentSection.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="p-6 rounded-xl shadow-2xl mb-8 gradient-border-card">
        <h2 className="text-sm font-semibold text-[#52E5A3] uppercase tracking-wider">Overall Progress</h2>
        <div className="mt-2">
            <ProgressBar value={totalProgress} />
        </div>
        <div className="mt-4 flex justify-between text-xs text-gray-400">
            <span>Section {currentSectionIndex + 1} of {sections.length}</span>
            <span>{Math.round(totalProgress)}% Complete</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-xl shadow-2xl gradient-border-card">
        <div className="mb-6 pb-4 border-b border-white/20">
            <div className="flex items-center justify-between">
                 <div className="flex items-center">
                    {SectionIcon && <SectionIcon className="w-8 h-8 text-[#52E5A3] mr-4"/>}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-100">{currentSection.title}</h3>
                        <p className="text-sm text-gray-400">Max Points: {currentSection.maxPoints}</p>
                    </div>
                </div>
                <p className="text-sm font-semibold text-gray-300">
                    Question {currentQuestionIndex + 1} / {currentSection.questions.length}
                </p>
            </div>
            <p className="mt-4 text-gray-300">{currentSection.description}</p>
        </div>

        <div className="h-[30rem]">
            <QuestionnaireSection
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
              industryExamples={industryExamples}
            />
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex justify-between items-center">
          <button
            onClick={() => onNavigate('prev')}
            disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
            className="inline-flex items-center px-4 py-2 border border-[#52E5A3]/50 text-sm font-medium rounded-md shadow-sm text-[#52E5A3] bg-transparent hover:bg-[#52E5A3]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
          >
            <BackIcon className="mr-2 h-5 w-5" />
            Back
          </button>
          {!isLastQuestionOfAssessment ? (
            <button
              onClick={() => onNavigate('next')}
              disabled={!isQuestionAnswered}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-black bg-[#52E5A3] hover:bg-[#47C78F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
              <NextIcon className="ml-2 h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!isQuestionAnswered}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-black bg-[#52E5A3] hover:bg-[#47C78F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              View My Results
            </button>
          )}
        </div>
        {!isQuestionAnswered && <p className="text-center text-xs text-gray-500 mt-4">Please answer this question to proceed.</p>}
      </div>
    </div>
  );
};

export default Assessment;