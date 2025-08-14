import React, { useState } from 'react';
import { AssessmentSection, Question as QuestionType, Answer, SectionAnswers, MultiSelectAnswer } from '../types';
import { HelpIcon } from './Icons';

interface QuestionnaireSectionProps {
  question: QuestionType;
  answer: Answer | MultiSelectAnswer | undefined;
  onAnswer: (answer: Answer | MultiSelectAnswer) => void;
  industryExamples: string[];
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative flex items-center" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 text-sm text-white bg-[#0A0D22] rounded-md shadow-lg z-10 border border-white/20">
                    {text}
                </div>
            )}
        </div>
    );
};


const Question: React.FC<{ question: QuestionType; answer: Answer | MultiSelectAnswer | undefined; onAnswer: (answer: Answer | MultiSelectAnswer) => void; industryExamples: string[] }> = ({ question, answer, onAnswer, industryExamples }) => {
    
    const handleSingleSelectChange = (option: { text: string; points: number }) => {
        onAnswer({
            questionId: question.id,
            points: option.points,
            selectedOptionText: option.text,
        });
    };

    const handleMultiSelectChange = (option: { text: string; points: number }, isChecked: boolean) => {
        const currentAnswer = (answer as MultiSelectAnswer) || { questionId: question.id, points: 0, selectedOptions: [] };
        let newSelectedOptions: string[];
        if (isChecked) {
            newSelectedOptions = [...currentAnswer.selectedOptions, option.text];
        } else {
            newSelectedOptions = currentAnswer.selectedOptions.filter(opt => opt !== option.text);
        }
        
        const newPoints = newSelectedOptions.length * question.options[0].points; // Assumes all multiselect options have same point value

        onAnswer({
            ...currentAnswer,
            selectedOptions: newSelectedOptions,
            points: newPoints
        });
    };
    
    const helpText = question.id === 'q4_1' 
        ? `${question.helpText} For your industry, this could include: ${industryExamples.join(', ')}.`
        : question.helpText;
        
    return (
        <div className="bg-white/5 p-6 rounded-lg">
            <div className="flex justify-between items-start">
                <p className="text-lg font-semibold text-gray-100">{question.questionText}</p>
                <Tooltip text={helpText}>
                    <HelpIcon className="h-5 w-5 text-gray-400 hover:text-[#52E5A3] cursor-pointer"/>
                </Tooltip>
            </div>
            <div className="mt-4 space-y-3">
                {question.isMultiSelect ? (
                    question.options.map(option => {
                         const isChecked = (answer as MultiSelectAnswer)?.selectedOptions?.includes(option.text) || false;
                        return (
                        <label key={option.text} className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${isChecked ? 'bg-[#52E5A3]/10 border-[#52E5A3]' : 'bg-transparent border-white/20 hover:bg-white/10'}`}>
                            <input
                                type="checkbox"
                                name={question.id}
                                checked={isChecked}
                                onChange={(e) => handleMultiSelectChange(option, e.target.checked)}
                                className="h-4 w-4 text-[#52E5A3] bg-transparent border-gray-500 rounded focus:ring-[#52E5A3]"
                            />
                            <span className="ml-3 text-gray-300">{option.text}</span>
                        </label>
                    )})
                ) : (
                    question.options.map(option => (
                        <label key={option.text} className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${(answer as Answer)?.selectedOptionText === option.text ? 'bg-[#52E5A3]/10 border-[#52E5A3]' : 'bg-transparent border-white/20 hover:bg-white/10'}`}>
                            <input
                                type="radio"
                                name={question.id}
                                value={option.text}
                                checked={(answer as Answer)?.selectedOptionText === option.text}
                                onChange={() => handleSingleSelectChange(option)}
                                className="h-4 w-4 text-[#52E5A3] bg-transparent border-gray-500 focus:ring-[#52E5A3] focus:ring-offset-black"
                            />
                            <span className="ml-3 text-gray-300">{option.text}</span>
                        </label>
                    ))
                )}
            </div>
        </div>
    );
};


const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({ question, answer, onAnswer, industryExamples }) => {
  return (
    <Question
      key={question.id}
      question={question}
      answer={answer}
      onAnswer={onAnswer}
      industryExamples={industryExamples}
    />
  );
};

export default QuestionnaireSection;