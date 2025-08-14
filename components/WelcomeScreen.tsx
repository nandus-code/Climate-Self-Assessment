import React, { useState } from 'react';
import type { CompanyProfile } from '../types';
import { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS, PRIMARY_GOAL_OPTIONS, TIMEFRAME_OPTIONS, GEOGRAPHIC_SCOPE_OPTIONS } from '../constants';
import { NameIcon, RoleIcon, PhoneIcon, EmailIcon, CompanyIcon, IndustryIcon, SizeIcon, GoalIcon, TimeframeIcon, ScopeIcon, NextIcon } from './Icons';

interface WelcomeScreenProps {
  onProfileSubmit: (profile: CompanyProfile) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onProfileSubmit }) => {
  const [profile, setProfile] = useState<CompanyProfile>({
    userName: '',
    userRole: '',
    userPhone: '',
    userEmail: '',
    companyName: '',
    industry: '',
    companySize: '',
    primaryGoal: '',
    currentClimateInitiatives: '',
    timeframe: '',
    geographicScope: ''
  });
  const [errors, setErrors] = useState<Partial<CompanyProfile>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CompanyProfile> = {};
    if (!profile.userName) newErrors.userName = "Your name is required.";
    if (!profile.userEmail) newErrors.userEmail = "A valid work email is required.";
    else if (!/\S+@\S+\.\S+/.test(profile.userEmail)) newErrors.userEmail = "Email is invalid.";
    if (!profile.companyName) newErrors.companyName = "Company name is required.";
    if (!profile.industry) newErrors.industry = "Industry is required.";
    if (!profile.companySize) newErrors.companySize = "Company size is required.";
    if (!profile.primaryGoal) newErrors.primaryGoal = "Primary goal is required.";
    if (!profile.timeframe) newErrors.timeframe = "Timeframe is required.";
    if (!profile.geographicScope) newErrors.geographicScope = "Scope is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onProfileSubmit(profile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CompanyProfile]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const renderInput = (id: keyof CompanyProfile, label: string, Icon: React.ElementType, placeholder: string, type: string = 'text') => (
    <div>
        <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-300 mb-1">
            <Icon className="w-4 h-4 mr-2 text-[#52E5A3]" /> {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={profile[id]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full p-2 bg-white/5 border rounded-md shadow-sm focus:ring-[#52E5A3]/50 focus:border-[#52E5A3] text-[#e2e7e6] placeholder-gray-500 ${errors[id] ? 'border-red-500' : 'border-white/20'}`}
        />
        {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );
  
  const renderSelect = (id: keyof CompanyProfile, label: string, Icon: React.ElementType, options: string[]) => (
    <div>
        <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-300 mb-1">
            <Icon className="w-4 h-4 mr-2 text-[#52E5A3]" /> {label}
        </label>
        <select
            id={id}
            name={id}
            value={profile[id]}
            onChange={handleChange}
            className={`w-full p-2 bg-white/5 border rounded-md shadow-sm focus:ring-[#52E5A3]/50 focus:border-[#52E5A3] text-[#e2e7e6] ${errors[id] ? 'border-red-500' : 'border-white/20'}`}
        >
            <option value="" className="text-gray-500 bg-[#010419]">Select an option</option>
            {options.map(opt => <option key={opt} value={opt} className="bg-[#010419]">{opt}</option>)}
        </select>
        {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-[#010419] gradient-border-card">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Climate Tech Adoption Readiness Assessment</h1>
        <p className="mt-2 text-lg text-gray-300">Discover where your organization stands in climate tech adoption and what's needed to advance your strategy through targeted assessment and planning with Climate Insider.</p>
        <p className="mt-4 text-gray-400">Begin by telling us about your organization and your role.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('userName', 'Your Name', NameIcon, 'e.g., Jane Doe')}
            {renderInput('userRole', 'Your Role', RoleIcon, 'e.g., Sustainability Manager')}
            {renderInput('userPhone', 'Telephone Number (Optional)', PhoneIcon, 'e.g., +1 234 567 8900', 'tel')}
            {renderInput('userEmail', 'Work Email', EmailIcon, 'e.g., jane.doe@acme.com', 'email')}
            {renderInput('companyName', 'Company Name', CompanyIcon, 'e.g., Acme Corporation')}
            {renderSelect('industry', 'Industry', IndustryIcon, INDUSTRY_OPTIONS)}
            {renderSelect('companySize', 'Company Size', SizeIcon, COMPANY_SIZE_OPTIONS)}
            {renderSelect('primaryGoal', 'Primary Goal for Climate Tech', GoalIcon, PRIMARY_GOAL_OPTIONS)}
            {renderSelect('timeframe', 'Implementation Timeframe', TimeframeIcon, TIMEFRAME_OPTIONS)}
            {renderSelect('geographicScope', 'Geographic Scope', ScopeIcon, GEOGRAPHIC_SCOPE_OPTIONS)}
        </div>
        <div>
          <label htmlFor="currentClimateInitiatives" className="flex items-center text-sm font-medium text-gray-300 mb-1">Current Climate Initiatives (Optional)</label>
          <textarea
            id="currentClimateInitiatives"
            name="currentClimateInitiatives"
            rows={3}
            value={profile.currentClimateInitiatives}
            onChange={handleChange}
            placeholder="Briefly describe any ongoing projects, policies, or goals related to sustainability or climate change."
            className="w-full p-2 bg-white/5 border rounded-md shadow-sm focus:ring-[#52E5A3]/50 focus:border-[#52E5A3] border-white/20 text-[#e2e7e6] placeholder-gray-500"
          />
        </div>
        <div className="pt-4 flex justify-end">
          <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-black bg-[#52E5A3] hover:bg-[#47C78F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#010419] focus:ring-[#52E5A3] transition-colors">
            Start Assessment
            <NextIcon className="ml-2 -mr-1 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WelcomeScreen;