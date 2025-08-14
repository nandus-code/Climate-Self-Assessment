import React, { useState, useMemo, useCallback } from 'react';
import type { CompanyProfile, Answers, AppStep, Scores, Answer, SectionAnswers, MultiSelectAnswer } from './types';
import { ASSESSMENT_SECTIONS, INDUSTRY_SPECIFIC_CONTENT } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import Assessment from './components/Assessment';
import ResultsDashboard from './components/ResultsDashboard';
import Logo from './components/Logo';

const initialAnswers: Answers = ASSESSMENT_SECTIONS.reduce((acc, section) => {
    acc[section.id] = [];
    return acc;
}, {} as Answers);

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('profile');
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
    const [answers, setAnswers] = useState<Answers>(initialAnswers);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


    const handleProfileSubmit = useCallback((profile: CompanyProfile) => {
        setCompanyProfile(profile);
        setStep('assessment');
    }, []);

    const handleAnswer = useCallback((sectionId: string, newAnswer: Answer | MultiSelectAnswer) => {
        setAnswers(prevAnswers => {
            const sectionAnswers = prevAnswers[sectionId];
            const existingAnswerIndex = sectionAnswers.findIndex(a => a.questionId === newAnswer.questionId);
            const newSectionAnswers = [...sectionAnswers];

            if (existingAnswerIndex > -1) {
                newSectionAnswers[existingAnswerIndex] = newAnswer;
            } else {
                newSectionAnswers.push(newAnswer);
            }
            return { ...prevAnswers, [sectionId]: newSectionAnswers };
        });
    }, []);
    
    const handleNavigation = useCallback((direction: 'next' | 'prev') => {
        const currentSection = ASSESSMENT_SECTIONS[currentSectionIndex];
        const isLastQuestionInSection = currentQuestionIndex === currentSection.questions.length - 1;
        const isFirstQuestionInSection = currentQuestionIndex === 0;

        if (direction === 'next') {
            if (isLastQuestionInSection) {
                if (currentSectionIndex < ASSESSMENT_SECTIONS.length - 1) {
                    setCurrentSectionIndex(prev => prev + 1);
                    setCurrentQuestionIndex(0);
                }
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
            }
        } else if (direction === 'prev') {
            if (isFirstQuestionInSection) {
                if (currentSectionIndex > 0) {
                    const prevSectionIndex = currentSectionIndex - 1;
                    const prevSection = ASSESSMENT_SECTIONS[prevSectionIndex];
                    setCurrentSectionIndex(prevSectionIndex);
                    setCurrentQuestionIndex(prevSection.questions.length - 1);
                }
            } else {
                setCurrentQuestionIndex(prev => prev - 1);
            }
        }
    }, [currentSectionIndex, currentQuestionIndex]);

    const handleComplete = useCallback(() => {
        setStep('results');
    }, []);
    
    const handleRestart = useCallback(() => {
        setAnswers(initialAnswers);
        setCompanyProfile(null);
        setCurrentSectionIndex(0);
        setCurrentQuestionIndex(0);
        setStep('profile');
    }, []);

    const totalProgress = useMemo(() => {
        const totalQuestions = ASSESSMENT_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);
        const answeredQuestions = Object.values(answers).flat().length;
        return totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    }, [answers]);
    
    const scores = useMemo<Scores>(() => {
        let grandTotalRaw = 0;
        let grandTotalMax = 0;

        const sectionScores = ASSESSMENT_SECTIONS.reduce((acc, section) => {
            const sectionAnswers = answers[section.id] || [];
            const rawScore = sectionAnswers.reduce((sum, answer) => sum + answer.points, 0);
            const maxScore = section.maxPoints;
            grandTotalRaw += rawScore;
            grandTotalMax += maxScore;

            acc[section.id] = {
                rawScore,
                maxScore,
                percentage: maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0,
            };
            return acc;
        }, {} as { [key: string]: { rawScore: number, maxScore: number, percentage: number } });

        return {
            ...sectionScores,
            total: {
                rawScore: grandTotalRaw,
                maxScore: grandTotalMax,
                percentage: grandTotalMax > 0 ? Math.round((grandTotalRaw / grandTotalMax) * 100) : 0,
            },
        };
    }, [answers]);

    const industryExamples = useMemo(() => {
        return companyProfile?.industry ? INDUSTRY_SPECIFIC_CONTENT[companyProfile.industry]?.technologyExamples || INDUSTRY_SPECIFIC_CONTENT['Other'].technologyExamples : INDUSTRY_SPECIFIC_CONTENT['Other'].technologyExamples;
    }, [companyProfile?.industry]);

    const renderStep = () => {
        switch (step) {
            case 'profile':
                return <WelcomeScreen onProfileSubmit={handleProfileSubmit} />;
            case 'assessment':
                return (
                    <Assessment
                        sections={ASSESSMENT_SECTIONS}
                        currentSectionIndex={currentSectionIndex}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={answers}
                        onAnswer={handleAnswer}
                        onNavigate={handleNavigation}
                        onComplete={handleComplete}
                        totalProgress={totalProgress}
                        industryExamples={industryExamples}
                    />
                );
            case 'results':
                if (companyProfile) {
                    return <ResultsDashboard scores={scores} profile={companyProfile} onRestart={handleRestart} />;
                }
                return null; // Should not happen
            default:
                return <div>Error: Unknown step.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#010419] font-sans">
             <header className="bg-transparent pt-4 sm:pt-6">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start items-center h-16">
                        <Logo />
                    </div>
                </nav>
            </header>
            <main className="py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {renderStep()}
                </div>
            </main>
        </div>
    );
};

export default App;