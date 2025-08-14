import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { CompanyProfile, Scores, ActionPlan, ReadinessLevel } from '../types';
import { ASSESSMENT_SECTIONS, getReadinessLevel } from '../constants';
import { generateActionPlan } from '../services/geminiService';
import { DownloadIcon, LoadingIcon, WarningIcon, EmailIcon, BookIcon, GoalIcon, ImmediateActionIcon, ShortTermActionIcon, LongTermActionIcon, IndustryIcon } from './Icons';

// Assume jspdf and html2canvas are loaded from CDN
declare const jspdf: any;
declare const html2canvas: any;

const ResultsDashboard: React.FC<{ scores: Scores; profile: CompanyProfile; onRestart: () => void }> = ({ scores, profile, onRestart }) => {
    const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const readinessLevel = getReadinessLevel(scores.total.rawScore);

    const SectionScoreChart: React.FC<{ scores: Scores }> = ({ scores }) => {
        const data = ASSESSMENT_SECTIONS.map(section => ({
            name: section.title.split(' ').slice(0, 2).join(' '),
            fullName: section.title,
            ...scores[section.id]
        }));

        return (
            <div className="p-6 rounded-xl shadow-2xl gradient-border-card">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Section Breakdown</h3>
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#e2e7e6' }} />
                            <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} tick={{ fill: '#e2e7e6' }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(82, 229, 163, 0.1)' }}
                                contentStyle={{ backgroundColor: '#0A0D22', border: '1px solid #52E5A3', borderRadius: '0.5rem', color: '#e2e7e6' }}
                                labelStyle={{ fontWeight: 'bold', color: '#52E5A3' }}
                                formatter={(value, name, props) => [`${props.payload.rawScore}/${props.payload.maxScore} pts`, `${value}%`]}
                                labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                            />
                            <Bar dataKey="percentage" name="Readiness" fill="#52E5A3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

    const CircularProgress: React.FC<{ score: number, readinessLevel: ReadinessLevel }> = ({ score, readinessLevel }) => {
        const radius = 70;
        const stroke = 10;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (score / 100) * circumference;

        return (
            <div className="relative flex items-center justify-center">
                <svg height={radius * 2} width={radius * 2} className="-rotate-90">
                    <circle
                        stroke="rgba(255, 255, 255, 0.1)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className={`${readinessLevel.textColor} transition-all duration-1000 ease-out`}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-4xl font-extrabold ${readinessLevel.textColor}`}>{score}</span>
                    <span className="text-sm font-medium text-gray-400">/ 100</span>
                </div>
            </div>
        );
    };

    const ActionPlanDisplay: React.FC<{ plan: ActionPlan }> = ({ plan }) => {
        const actionBlocks = [
            { title: "Priority Areas", items: plan.priorityAreas, Icon: GoalIcon },
            { title: "Immediate Actions (0-6 Months)", items: plan.immediateActions, Icon: ImmediateActionIcon },
            { title: "Short-Term Actions (6-18 Months)", items: plan.shortTermActions, Icon: ShortTermActionIcon },
            { title: "Long-Term Actions (18+ Months)", items: plan.longTermActions, Icon: LongTermActionIcon },
            { title: "Industry-Specific Recommendations", items: plan.industrySpecificRecommendations, Icon: IndustryIcon },
            { title: "Goal-Specific Recommendations", items: plan.goalSpecificRecommendations, Icon: GoalIcon }
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionBlocks.map(block => (
                    block.items && block.items.length > 0 && (
                        <div key={block.title} className="p-4 rounded-lg flex flex-col h-full gradient-border-card">
                            <h4 className="text-md font-semibold text-[#52E5A3] mb-3 flex items-center">
                                <block.Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span>{block.title}</span>
                            </h4>
                            <ul className="list-disc list-inside space-y-1.5 text-gray-300 text-sm flex-grow pl-1">
                                {block.items.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        );
    };

    useEffect(() => {
        const fetchActionPlan = async () => {
            setIsLoading(true);
            const plan = await generateActionPlan(profile, scores);
            setActionPlan(plan);
            setIsLoading(false);
        };
        fetchActionPlan();
    }, [profile, scores]);

    const handleEmailReport = () => {
        if (!actionPlan || !profile.userEmail) {
            alert("Cannot send email. User email or action plan is missing.");
            return;
        }

        const formatList = (items: string[]) => items.map(item => `- ${item}`).join('\n');

        const subject = `Your Climate Tech Readiness Report from Climate Insider`;
        const body = `
Dear ${profile.userName},

Thank you for completing the Climate Tech Adoption Readiness Assessment. Here is a summary of your results and personalized action plan.

**Overall Score: ${scores.total.rawScore}/100 - ${readinessLevel.level}**

---

**Personalized Action Plan**

**Priority Areas:**
${formatList(actionPlan.priorityAreas)}

**Immediate Actions (0-6 Months):**
${formatList(actionPlan.immediateActions)}

**Short-Term Actions (6-18 Months):**
${formatList(actionPlan.shortTermActions)}

**Long-Term Actions (18+ Months):**
${formatList(actionPlan.longTermActions)}

**Industry-Specific Recommendations:**
${formatList(actionPlan.industrySpecificRecommendations)}

**Goal-Specific Recommendations:**
${formatList(actionPlan.goalSpecificRecommendations)}

---

This report was generated for ${profile.companyName}.

To discuss these results further, you can book a consultation with our experts: https://calendar.google.com/calendar/appointments/schedules/YOUR_BOOKING_LINK_HERE

Regards,
The Climate Insider Team
        `;
        window.location.href = `mailto:${profile.userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleDownload = async () => {
        if (!reportRef.current) return;
        setIsDownloading(true);
        const { jsPDF } = jspdf;
        try {
            // Temporarily switch to a light theme for PDF generation
            reportRef.current.classList.add('light-theme-pdf');
            
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            // Revert theme
            reportRef.current.classList.remove('light-theme-pdf');

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgRatio = canvas.width / canvas.height;
            
            let imgWidthOnPdf = pdfWidth - 20; // 10mm margin on each side
            let imgHeightOnPdf = imgWidthOnPdf / imgRatio;

            // Check if it fits, if not, scale to fit height
            if (imgHeightOnPdf > pdfHeight - 20) {
                imgHeightOnPdf = pdfHeight - 20;
                imgWidthOnPdf = imgHeightOnPdf * imgRatio;
            }

            const x = (pdfWidth - imgWidthOnPdf) / 2;
            const y = 10;
            
            pdf.addImage(imgData, 'PNG', x, y, imgWidthOnPdf, imgHeightOnPdf);
            pdf.save(`Climate_Insider_Readiness_Report_${profile.companyName.replace(/\s/g, '_')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    
    const ReportContent = () => (
         <>
             <style>{`
                .light-theme-pdf {
                    background-color: #ffffff !important;
                    color: #1f2937 !important;
                }
                .light-theme-pdf h1, .light-theme-pdf h2, .light-theme-pdf h3, .light-theme-pdf h4, .light-theme-pdf span, .light-theme-pdf p, .light-theme-pdf div, .light-theme-pdf li {
                    color: #1f2937 !important;
                }
                .light-theme-pdf .recharts-text {
                    fill: #374151 !important;
                }
                .light-theme-pdf .recharts-cartesian-grid-line line {
                    stroke: #e5e7eb !important;
                }
                .light-theme-pdf .gradient-border-card {
                    background: #f9fafb !important;
                    border-color: #e5e7eb !important;
                }
                 .light-theme-pdf .gradient-border-card::before {
                    background: transparent !important;
                }
                .light-theme-pdf .font-semibold {
                    color: #111827 !important;
                }
             `}</style>
             <div className="p-6">
                 <h1 className="text-2xl font-bold mb-1 text-white">Climate Tech Readiness Report</h1>
                 <p className="text-md text-gray-300 mb-6">For: {profile.companyName}</p>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                     <div className="md:col-span-1 p-4 rounded-xl flex flex-col items-center justify-center gradient-border-card">
                         <CircularProgress score={scores.total.rawScore} readinessLevel={readinessLevel} />
                     </div>
                     <div className="md:col-span-2 p-6 rounded-xl flex flex-col justify-center gradient-border-card">
                         <h2 className={`text-xl font-bold ${readinessLevel.textColor}`}>{readinessLevel.level}</h2>
                         <p className="mt-2 text-gray-300 text-sm">{readinessLevel.description}</p>
                     </div>
                 </div>
                 
                 <div className="mb-6">
                    <SectionScoreChart scores={scores} />
                 </div>

                 <div className="p-6 rounded-xl shadow-2xl gradient-border-card">
                    <h3 className="text-xl font-bold text-gray-100 mb-4">Personalized Action Plan</h3>
                    {isLoading ? <div className="text-center py-8"><LoadingIcon className="animate-spin h-8 w-8 text-[#52E5A3] mx-auto" /></div> : actionPlan && <ActionPlanDisplay plan={actionPlan} />}
                 </div>

                 <div className="mt-8 pt-4 border-t border-white/20 text-center text-sm text-gray-400">
                    <p className="font-semibold">This assessment was created by Climate Insider.</p>
                </div>
            </div>
        </>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
            <div ref={reportRef} className="bg-[#010419]">
                <ReportContent/>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
                <a
                    href="https://calendar.google.com/calendar/appointments/schedules/YOUR_BOOKING_LINK_HERE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-black bg-[#52E5A3] hover:bg-[#47C78F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] transition-colors"
                >
                    <BookIcon className="mr-2 h-5 w-5" />
                    Book a Consultation
                </a>
                 <button
                    onClick={handleDownload}
                    disabled={isDownloading || isLoading}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-[#52E5A3]/50 text-base font-medium rounded-md shadow-sm text-[#52E5A3] bg-transparent hover:bg-[#52E5A3]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] disabled:opacity-50"
                >
                    {isDownloading ? <LoadingIcon className="animate-spin mr-2 h-5 w-5" /> : <DownloadIcon className="mr-2 h-5 w-5" />}
                    {isDownloading ? 'Generating...' : 'Download Report'}
                </button>
                 <button
                    onClick={handleEmailReport}
                    disabled={isLoading || !actionPlan}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-[#52E5A3]/50 text-base font-medium rounded-md shadow-sm text-[#52E5A3] bg-transparent hover:bg-[#52E5A3]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] disabled:opacity-50"
                >
                    <EmailIcon className="mr-2 h-5 w-5" />
                    Email Report
                </button>
                <button
                    onClick={onRestart}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border-transparent text-sm font-medium rounded-md shadow-sm text-gray-400 hover:text-white focus:outline-none"
                >
                    Start New Assessment
                </button>
            </div>
             {isLoading && (
                <div className="fixed inset-0 bg-[#010419] bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <LoadingIcon className="animate-spin h-12 w-12 text-[#52E5A3]" />
                    <p className="mt-4 text-lg font-semibold text-gray-200">Generating Your Personalized Action Plan...</p>
                    <p className="text-gray-400">Our AI is analyzing your results.</p>
                </div>
            )}
            {actionPlan?.priorityAreas[0].includes("Error") && !isLoading && (
                <div className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500">
                    <div className="flex">
                        <div className="flex-shrink-0">
                           <WarningIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                           <p className="text-sm text-red-200">
                           Could not generate AI recommendations. Please check your API key or network.
                           </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsDashboard;