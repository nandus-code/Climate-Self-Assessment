import { AssessmentSection, ReadinessLevel } from './types';

export const INDUSTRY_OPTIONS = [
  "Manufacturing & Industrial",
  "Technology & Software",
  "Financial Services & Insurance",
  "Retail & Consumer Goods",
  "Healthcare & Pharmaceuticals",
  "Transportation & Logistics",
  "Energy & Utilities",
  "Construction & Real Estate",
  "Agriculture & Food",
  "Professional Services",
  "Other",
];

export const COMPANY_SIZE_OPTIONS = [
  "Small (1-50 employees)",
  "Medium (51-500 employees)",
  "Large (501-5000 employees)",
  "Enterprise (5000+ employees)",
];

export const PRIMARY_GOAL_OPTIONS = [
  "Achieve net-zero emissions by 2030",
  "Achieve net-zero emissions by 2050",
  "Reduce operational costs through efficiency",
  "Meet regulatory compliance requirements",
  "Enhance brand reputation and ESG ratings",
  "Access green financing and investment",
  "Gain competitive advantage in sustainability",
  "Respond to customer/stakeholder demands",
  "Other",
];

export const TIMEFRAME_OPTIONS = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];
export const GEOGRAPHIC_SCOPE_OPTIONS = ["Local", "National", "Regional", "Global"];

export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  {
    id: 'section1',
    title: "Research & Development Capacity",
    description: "This section evaluates your organization's ability to innovate and develop new climate technologies, a crucial driver for long-term competitive advantage.",
    maxPoints: 20,
    questions: [
      {
        id: 'q1_1',
        questionText: "How many climate technology patents, research publications, or innovation projects has your company filed/completed in the past 3 years?",
        options: [
          { text: "None", points: 0 },
          { text: "1 patent/publication", points: 2 },
          { text: "2-4", points: 4 },
          { text: "5-14", points: 6 },
          { text: "15+", points: 8 },
        ],
        helpText: "Include patents in renewable energy, energy efficiency, carbon capture, sustainable materials, etc.",
        maxPoints: 8,
      },
      {
        id: 'q1_2',
        questionText: "What best describes your company's climate technology research capabilities?",
        options: [
          { text: "No dedicated research infrastructure", points: 0 },
          { text: "Limited internal R&D with some external partnerships", points: 2 },
          { text: "Specialized R&D capabilities across locations with climate focus", points: 4 },
          { text: "Dedicated physical R&D facility or extensive strategic research partnerships", points: 6 },
        ],
        helpText: "Consider both in-house facilities and formal partnerships with research institutions.",
        maxPoints: 6,
      },
      {
        id: 'q1_3',
        questionText: "How does your company disclose climate technology R&D investments?",
        options: [
            { text: "No separate disclosure", points: 0 },
            { text: "References climate innovation without financial details", points: 2 },
            { text: "Discloses significant investment but not separated from broader R&D", points: 4 },
            { text: "Provides specific climate tech R&D expenditure disclosure (≥20% of total R&D)", points: 6 },
        ],
        helpText: "This refers to public disclosures in annual reports, sustainability reports, or investor briefings.",
        maxPoints: 6,
      },
    ],
  },
  {
    id: 'section2',
    title: "Human Capital & Leadership",
    description: "Assesses the organizational structure, leadership commitment, and internal expertise dedicated to climate technology, which are essential for successful strategy execution.",
    maxPoints: 15,
    questions: [
        {
            id: 'q2_1',
            questionText: "How is climate technology organized within your company?",
            options: [
                { text: "No formal structure", points: 0 },
                { text: "Project-based initiatives without formal structure", points: 2 },
                { text: "Integrated teams within existing operations", points: 4 },
                { text: "Formal dedicated division/unit with independent governance", points: 5 },
            ],
            helpText: "Consider how accountability and resources for climate tech are structured.",
            maxPoints: 5,
        },
        {
            id: 'q2_2',
            questionText: "What level of executive leadership exists for climate technology?",
            options: [
                { text: "No executive leadership", points: 0 },
                { text: "Distributed responsibilities without clear accountability", points: 1 },
                { text: "Integrated into existing executive roles (e.g., CTO, COO)", points: 3 },
                { text: "C-suite role with explicit climate tech responsibility (e.g., Chief Sustainability Officer)", points: 5 },
            ],
            helpText: "This assesses the level of strategic importance assigned to climate tech.",
            maxPoints: 5,
        },
        {
            id: 'q2_3',
            questionText: "What climate technology skill development programs does your company offer?",
            options: [
                { text: "No systematic programs", points: 0 },
                { text: "Limited or ad hoc training activities", points: 1 },
                { text: "Broad programs integrating climate topics into general training", points: 3 },
                { text: "Formal, structured, recurring climate tech training programs for relevant staff", points: 5 },
            ],
            helpText: "Includes internal training, external courses, and certification programs.",
            maxPoints: 5,
        },
    ]
  },
  {
    id: 'section3',
    title: "Collaborative Ecosystem",
    description: "Measures your company's engagement with external partners, including industry consortia, universities, and startups, to leverage collective intelligence and resources.",
    maxPoints: 20,
    questions: [
        {
            id: 'q3_1',
            questionText: "What is your company's involvement in climate technology industry consortia?",
            options: [
                { text: "No participation", points: 0 },
                { text: "Minimal/symbolic memberships", points: 1 },
                { text: "Active participant in major consortia", points: 3 },
                { text: "Founding member or leadership role in multiple consortia", points: 4 },
            ],
            helpText: "Consortia are groups of companies working together on shared challenges.",
            maxPoints: 4,
        },
        {
            id: 'q3_2',
            questionText: "How extensive are your university/research institution partnerships for climate technology?",
            options: [
                { text: "No partnerships", points: 0 },
                { text: "Informal or project-specific collaborations", points: 1 },
                { text: "One formal long-term partnership or multiple smaller ones", points: 3 },
                { text: "Multiple formal, long-term strategic research partnerships", points: 4 },
            ],
            helpText: "Formal partnerships often involve multi-year funding and shared research goals.",
            maxPoints: 4,
        },
        {
            id: 'q3_3',
            questionText: "How many formal joint ventures focused on climate technology solutions does your company have?",
            options: [
                { text: "None", points: 0 },
                { text: "1-2 JVs", points: 2 },
                { text: "3+ JVs", points: 4 },
            ],
            helpText: "A joint venture is a business arrangement where two or more parties agree to pool their resources for the purpose of accomplishing a specific task.",
            maxPoints: 4,
        },
        {
            id: 'q3_4',
            questionText: "How many climate tech startups has your company invested in through corporate venture or strategic programs?",
            options: [
                { text: "None", points: 0 },
                { text: "1-3", points: 1 },
                { text: "4-6", points: 3 },
                { text: "7+", points: 4 },
            ],
            helpText: "Consider direct equity investments made by your company or its CVC arm.",
            maxPoints: 4,
        },
        {
            id: 'q3_5',
            questionText: "How many climate tech companies has your company acquired in the last 3 years?",
            options: [
                { text: "None", points: 0 },
                { text: "1 acquisition", points: 2 },
                { text: "2+ acquisitions", points: 4 },
            ],
            helpText: "An acquisition is the purchase of one company by another.",
            maxPoints: 4,
        },
    ],
  },
    {
    id: 'section4',
    title: "Technology Implementation",
    description: "Examines the extent to which your company has deployed and operationalized climate technologies across its assets and value chain.",
    maxPoints: 15,
    questions: [
        {
            id: 'q4_1',
            questionText: "How many major climate technology implementations does your company have operational or in advanced development?",
            options: [
                { text: "None", points: 0 },
                { text: "1-2 in development/pilot stage", points: 2 },
                { text: "2-3 with at least one fully operational", points: 4 },
                { text: "4+ operational or in advanced development", points: 6 },
            ],
            helpText: "Examples: Energy efficiency systems, waste heat recovery, sustainable materials, circular economy processes. (Industry-specific examples will be shown).",
            maxPoints: 6,
        },
        {
            id: 'q4_2',
            questionText: "What renewable energy projects does your company have?",
            options: [
                { text: "None", points: 0 },
                { text: "Pilot-scale projects only", points: 1 },
                { text: "1-2 projects operational or confirmed", points: 3 },
                { text: "Multiple projects operational or at Final Investment Decision (FID)", points: 5 },
            ],
            helpText: "Includes on-site generation (e.g., solar panels) and off-site Power Purchase Agreements (PPAs).",
            maxPoints: 5,
        },
        {
            id: 'q4_3',
            questionText: "How extensively has your company deployed digital technologies for emissions reduction?",
            options: [
                { text: "No deployment", points: 0 },
                { text: "Pilot-only without operational integration", points: 1 },
                { text: "Partial deployment with indirect benefits for emissions", points: 2 },
                { text: "Substantial deployment in certain segments (e.g., supply chain optimization)", points: 3 },
                { text: "Full deployment across multiple facilities/operations with direct emissions tracking", points: 4 },
            ],
            helpText: "Examples include IoT sensors for energy management, AI for process optimization, or blockchain for supply chain transparency.",
            maxPoints: 4,
        },
    ]
  },
  {
    id: 'section5',
    title: "Regulatory & Risk Management",
    description: "Evaluates your company's proactiveness in shaping climate policy and the maturity of its processes for managing and disclosing climate-related risks.",
    maxPoints: 15,
    questions: [
        {
            id: 'q5_1',
            questionText: "How engaged is your company in climate policy and advocacy?",
            options: [
                { text: "No public policy positions on climate", points: 0 },
                { text: "Minimal climate policy statements, largely reactive", points: 1 },
                { text: "Publicly supports high-level climate action (e.g., Paris Agreement)", points: 3 },
                { text: "Has broad policy positions but lacks transparency on lobbying", points: 5 },
                { text: "Publishes detailed policy positions with governance oversight and transparent lobbying", points: 7 },
            ],
            helpText: "Reflects your company's proactive stance in shaping climate-related regulations.",
            maxPoints: 7,
        },
        {
            id: 'q5_2',
            questionText: "How comprehensive is your company's climate risk management and disclosure?",
            options: [
                { text: "No meaningful disclosure on climate risk", points: 0 },
                { text: "High-level commentary without a structured framework", points: 1 },
                { text: "General disclosure with partial alignment to a framework (e.g., TCFD)", points: 3 },
                { text: "Structured disclosure aligned with TCFD, including qualitative scenario analysis", points: 6 },
                { text: "Full structured disclosure (TCFD) with quantitative financial impacts from scenario analysis", points: 8 },
            ],
            helpText: "TCFD (Task Force on Climate-related Financial Disclosures) is the leading framework for climate risk reporting.",
            maxPoints: 8,
        },
    ]
  },
  {
    id: 'section6',
    title: "Business Model Innovation",
    description: "Focuses on how deeply climate technology is integrated into your core corporate strategy, capital allocation, and business structure to create new value.",
    maxPoints: 15,
    questions: [
        {
            id: 'q6_1',
            questionText: "How central are climate technologies to your company's corporate strategy?",
            options: [
                { text: "No integration, climate is seen as a compliance issue", points: 0 },
                { text: "Symbolic mentions in reports with no clear strategic link", points: 1 },
                { text: "Acknowledged as a strategic area with minimal capital allocation (<10% of capex)", points: 3 },
                { text: "Well-integrated with significant capital allocation (≥10% of capex) to climate tech", points: 6 },
                { text: "Central to corporate strategy with ≥20% capital allocation and dedicated business units", points: 8 },
            ],
            helpText: "Capex (Capital Expenditure) is funds used by a company to acquire, upgrade, and maintain physical assets.",
            maxPoints: 8,
        },
        {
            id: 'q6_2',
            questionText: "Which of the following does your company have for climate technology? (Select all that apply)",
            isMultiSelect: true,
            options: [
                { text: "Named business unit or dedicated division", points: 1 },
                { text: "Covers multiple climate technology domains (e.g., renewables, efficiency)", points: 1 },
                { text: "Dedicated leadership reporting to senior management", points: 1 },
                { text: "Project or financial segmentation with disclosed metrics", points: 1 },
                { text: "Strategic partnerships or external investment structure", points: 1 },
                { text: "Integration in corporate strategy and investor communications", points: 1 },
                { text: "Standalone targets, KPIs, or performance metrics", points: 1 },
            ],
            helpText: "This question assesses the maturity of your business structure around climate tech.",
            maxPoints: 7,
        }
    ],
  },
];

export const getReadinessLevel = (totalScore: number): ReadinessLevel => {
    if (totalScore >= 90) return { level: "Climate Tech Leader", color: "bg-[#52E5A3]", textColor: "text-[#52E5A3]", description: "Your organization demonstrates exceptional readiness, positioning it to lead in the climate technology landscape. You have robust capabilities across all key areas." };
    if (totalScore >= 70) return { level: "Climate Tech Adopter", color: "bg-[#47C78F]", textColor: "text-[#47C78F]", description: "Your organization has a strong foundation and is actively adopting climate technologies. There are targeted areas for improvement to achieve leadership status." };
    if (totalScore >= 50) return { level: "Climate Tech Emerging", color: "bg-[#3BAA7A]", textColor: "text-[#3BAA7A]", description: "Your company shows moderate readiness but requires a more strategic and focused approach to unlock its full potential in climate tech." };
    if (totalScore >= 30) return { level: "Climate Tech Developing", color: "bg-[#2F8C66]", textColor: "text-[#2F8C66]", description: "Your organization is in the early stages of its climate tech journey. Significant investment and foundational work are required." };
    return { level: "Climate Tech Starter", color: "bg-[#236E51]", textColor: "text-[#236E51]", description: "Your organization is at the very beginning. Foundational work is needed across all areas to build climate tech readiness." };
};

export const INDUSTRY_SPECIFIC_CONTENT: { [key: string]: { technologyExamples: string[] } } = {
  "Manufacturing & Industrial": { technologyExamples: ["Energy efficiency systems", "Waste heat recovery", "Sustainable materials", "Circular processes"] },
  "Technology & Software": { technologyExamples: ["Green IT infrastructure", "Sustainable data centers", "Renewable energy procurement", "AI for energy optimization"] },
  "Financial Services & Insurance": { technologyExamples: ["Green bonds issuance platforms", "Climate risk analysis software", "Sustainable investment portfolio tools", "Parametric insurance for climate events"] },
  "Retail & Consumer Goods": { technologyExamples: ["Sustainable packaging solutions", "Supply chain transparency software", "Reverse logistics for circular economy", "Energy-efficient store lighting"] },
  "Healthcare & Pharmaceuticals": { technologyExamples: ["Green chemistry processes", "Energy-efficient lab equipment", "Sustainable medical device manufacturing", "Telehealth to reduce travel emissions"] },
  "Transportation & Logistics": { technologyExamples: ["Electric vehicle fleet", "Route optimization software", "Sustainable aviation fuel (SAF)", "Intermodal freight solutions"] },
  "Energy & Utilities": { technologyExamples: ["Smart grid technology", "Utility-scale battery storage", "Green hydrogen production", "Advanced metering infrastructure"] },
  "Construction & Real Estate": { technologyExamples: ["Low-carbon concrete", "Building energy management systems (BEMS)", "Prefabricated sustainable housing", "Geothermal heating/cooling"] },
  "Agriculture & Food": { technologyExamples: ["Precision agriculture sensors", "Alternative proteins", "Biofertilizers and biopesticides", "Agroforestry systems"] },
  "Professional Services": { technologyExamples: ["ESG reporting software", "Carbon accounting platforms", "Remote collaboration tools", "Sustainable business travel solutions"] },
  "Other": { technologyExamples: ["General energy efficiency", "Renewable energy procurement", "Waste reduction programs", "Sustainable supply chain management"] },
};