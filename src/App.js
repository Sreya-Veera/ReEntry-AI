import React, { useState } from 'react';
import { Home, TrendingUp, DollarSign, Briefcase, Heart, Brain, Calendar, ArrowLeft, AlertCircle, CheckCircle, Sparkles, Target, Users, Loader2, AlertTriangle, Eye } from 'lucide-react';

const ReEntryAI = () => {
  const [step, setStep] = useState('input');
  const [profile, setProfile] = useState({
    name: '',
    homeCountry: '',
    currentCountry: '',
    yearsAbroad: '',
    industry: '',
    currentRole: '',
    currentSalary: '',
    savings: '',
    familyStatus: '',
    returnReason: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [agentProgress, setAgentProgress] = useState({
    career: 'pending',
    financial: 'pending',
    cultural: 'pending',
    timing: 'pending'
  });
  const [results, setResults] = useState(null);
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const [realityCheck, setRealityCheck] = useState(null);
  const [loadingRealityCheck, setLoadingRealityCheck] = useState(false);

  const analyzeCareerTransition = async (profile) => {
    setAgentProgress(prev => ({ ...prev, career: 'analyzing' }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      roleTranslation: `Your ${profile.currentRole} translates to "Senior ${profile.industry} Professional" or "Team Lead" in ${profile.homeCountry}`,
      salaryRange: "$55,000 - $82,000",
      marketValue: "$68,000",
      demandLevel: "high",
      skillGaps: [
        {skill: "Local industry regulations", severity: "moderate", action: "Complete online certification course"},
        {skill: "Regional market knowledge", severity: "low", action: "Network with local professionals on LinkedIn"}
      ],
      advantages: [
        `${profile.yearsAbroad} years of international experience`,
        "Cross-cultural communication skills",
        "Exposure to global best practices",
        "English fluency and international network"
      ],
      demandForecast: `Strong demand in ${profile.homeCountry} with 28% year-over-year growth in ${profile.industry}`,
      hiringSeasons: "Peak hiring periods: January-March and August-September"
    };
    
    setAgentProgress(prev => ({ ...prev, career: 'complete' }));
    return mockData;
  };

  const analyzeFinancials = async (profile) => {
    setAgentProgress(prev => ({ ...prev, financial: 'analyzing' }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const savings = parseFloat(profile.savings);
    const sufficient = savings >= 25000;
    
    const mockData = {
      relocationCost: "$3,500 - $6,000",
      setupCosts: "$8,000 - $15,000",
      bufferNeeded: "$18,000 (4 months)",
      totalNeeded: "$29,500 - $39,000",
      taxExit: `No exit tax from ${profile.currentCountry} for your income level`,
      taxReturn: `Standard tax rates apply in ${profile.homeCountry}. Consult local tax advisor.`,
      taxAdvice: "File taxes in both countries for transition year. Consider tax treaty benefits.",
      costOfLivingChange: "-35% to -45%",
      sufficient: sufficient,
      incomeProjection: {
        current: `$${profile.currentSalary}/year`,
        projected: "$68,000/year",
        ppjAdjusted: "equivalent to $105,000 in purchasing power",
        breakeven: "6-8 months"
      },
      recommendation: sufficient 
        ? "Your savings provide a comfortable buffer for transition. Consider keeping 6 months as emergency fund."
        : "Build savings by $10-15K more before returning, or secure job offer before relocating."
    };
    
    setAgentProgress(prev => ({ ...prev, financial: 'complete' }));
    return mockData;
  };

  const analyzeCulturalReintegration = async (profile) => {
    setAgentProgress(prev => ({ ...prev, cultural: 'analyzing' }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const yearsAbroad = parseInt(profile.yearsAbroad);
    const riskLevel = yearsAbroad > 7 ? "Moderate-High" : yearsAbroad > 4 ? "Moderate" : "Low";
    
    const mockData = {
      riskLevel: riskLevel,
      riskExplanation: `After ${profile.yearsAbroad} years abroad, you may experience moderate reverse culture shock`,
      challenges: [
        "Adjusting to different pace of life and work culture",
        "Rebuilding professional and social networks",
        "Managing changed expectations from family/friends",
        "Reconciling idealized memories with current reality"
      ],
      adjustmentTimeline: "3-12 months for full reintegration, with peak difficulty at 2-4 months",
      psychologicalPatterns: "Common patterns include initial excitement, followed by frustration, then gradual acceptance and adaptation",
      peakDifficulty: "Months 2-4 typically show highest stress levels",
      strategies: [
        "Join returnee support groups (online and in-person)",
        "Maintain connections with international friends",
        "Set realistic expectations for first 6 months",
        "Consider working with a cross-cultural coach",
        "Practice mindfulness and give yourself grace"
      ],
      resources: [
        "Returnee professional networks in your city",
        "Cross-cultural adjustment counseling services"
      ],
      sentimentSummary: `Analysis of returnees to ${profile.homeCountry} shows 68% report positive outcomes after 12 months, with career growth and family connection as top benefits`
    };
    
    setAgentProgress(prev => ({ ...prev, cultural: 'complete' }));
    return mockData;
  };

  const analyzeOptimalTiming = async (profile, careerData, financialData, culturalData) => {
    setAgentProgress(prev => ({ ...prev, timing: 'analyzing' }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      optimal: "Q2 2026 (18 months)",
      reasoning: `Based on hiring cycles in ${profile.homeCountry}, financial preparedness timeline, and family considerations. Q2 aligns with peak hiring season and gives time for skill updates.`,
      confidenceLevel: "high",
      alternatives: [
        {
          period: "Q4 2025 (6 months)", 
          pros: "Faster return for family needs, holiday networking opportunities", 
          cons: "Less financial buffer, year-end hiring slowdown"
        },
        {
          period: "Q1 2027 (24 months)", 
          pros: "Maximum savings accumulation, more skill development time", 
          cons: "Prolonged separation from family, potential skill drift from local market"
        }
      ],
      monitorFactors: [
        `Job market conditions in ${profile.homeCountry}`,
        "Family situation urgency",
        "Savings accumulation rate",
        "Housing market conditions in target city"
      ],
      warnings: [
        "The longer you wait, the wider the cultural adjustment gap",
        `${profile.homeCountry} housing prices increasing 8-12% annually - consider locking in remotely`
      ],
      urgencyLevel: profile.returnReason.includes('family') 
        ? "Moderate-High due to family obligations" 
        : "Moderate - balanced approach recommended"
    };
    
    setAgentProgress(prev => ({ ...prev, timing: 'complete' }));
    return mockData;
  };

  const runRealityCheck = async (profile, results) => {
    setLoadingRealityCheck(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const yearsAbroad = parseInt(profile.yearsAbroad);
    const savings = parseFloat(profile.savings);
    const score = results.readinessScore;
    
    const mockRealityCheck = {
      title: "The Hard Truths About Your Return",
      severity: score >= 75 ? "moderate" : score >= 50 ? "significant" : "critical",
      blindSpots: [
        `After ${yearsAbroad} years, your home country has changed more than you think. The ${profile.homeCountry} you remember may not exist anymore.`,
        `Your family's expectations of you have likely grown unrealistic. They may expect you to solve problems you can't fix.`,
        `"International experience" sounds impressive, but local employers may see you as overqualified or culturally misaligned.`,
        `You've adapted to ${profile.currentCountry}'s efficiency and systems. Going back to slower bureaucracy will frustrate you more than you expect.`
      ],
      harshRealities: [
        `The $68K salary estimate assumes you find a job quickly. Average job search in ${profile.homeCountry} for returnees: 4-7 months, not weeks.`,
        `Reverse culture shock is more severe than initial culture shock. 40% of returnees report depression in months 2-5.`,
        `Your savings of $${savings.toLocaleString()} will disappear faster than projected. Hidden costs (bribes, connections, "favors") aren't in our model.`,
        `Career regression is common. You might need to take a step back (title/seniority) to prove yourself locally again.`,
        `Your international network won't help you as much at home. Local connections matter more, and yours are ${yearsAbroad} years old.`
      ],
      criticalQuestions: [
        `Are you romanticizing home? Close your eyes: can you handle the traffic, pollution, corruption, and inefficiency for the next 30 years?`,
        `Is this YOUR decision or family pressure? If family pressure, will you resent them in 2 years when reality hits?`,
        `Can your ego handle earning 1/3 of your current salary and being treated as "the person who came back" rather than "the successful expat"?`,
        `Have you lived in ${profile.homeCountry} as an adult, or only as a child/student? Adult life there is completely different.`,
        `What's your exit strategy if this fails? Can you return to ${profile.currentCountry}? Will you have burned bridges?`
      ],
      unsexyTruths: [
        `You'll spend 6 months explaining why you came back. People will assume you failed abroad.`,
        `Dating/social life: If single, you're now "too Westernized." If married to a foreigner, integration is 10x harder.`,
        `Your kids (if any) will struggle massively. They'll resent you for uprooting them. Teen years will be brutal.`,
        `Small freedoms you take for granted (speaking your mind, dressing how you want, questioning authority) may not exist back home.`,
        `You'll become the "rich relative" everyone asks for money. Boundaries will be tested constantly.`
      ],
      finalAdvice: `Look, a readiness score of ${score}/100 doesn't mean you're ready—it means you've checked boxes. The real question isn't "can I return?" but "can I handle the reality versus my expectations?" Most returnees who struggle aren't unprepared financially or professionally—they're unprepared emotionally. They underestimate how much THEY'VE changed. You're not the same person who left ${yearsAbroad} years ago. Coming home means accepting that you might never fully belong anywhere again—not abroad, not at home. That's the hardest truth. If you can accept that and still want to return, then go. But go with eyes wide open, not rose-colored glasses.`
    };
    
    setRealityCheck(mockRealityCheck);
    setLoadingRealityCheck(false);
  };

  const calculateReadinessScore = (career, financial, cultural) => {
    let score = 0;
    
    if (career.demandLevel === 'high') score += 20;
    else if (career.demandLevel === 'moderate') score += 12;
    else score += 5;
    
    const criticalGaps = career.skillGaps?.filter(g => g.severity === 'critical').length || 0;
    if (criticalGaps === 0) score += 15;
    else if (criticalGaps === 1) score += 8;
    else score += 3;
    
    if (financial.sufficient) score += 35;
    else {
      const savings = parseFloat(profile.savings) || 0;
      score += Math.floor((savings / 35000) * 35);
    }
    
    if (cultural.riskLevel === 'Low') score += 30;
    else if (cultural.riskLevel.includes('Moderate')) score += 18;
    else score += 8;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  };

  const generateActionPlan = () => {
    return [
      {
        phase: 'Phase 1: Pre-Planning (Now - 3 months)',
        tasks: [
          'Complete skills gap analysis and identify training needed',
          'Begin networking on LinkedIn with professionals in home country',
          'Research cost of living in target cities',
          'Start organizing financial documents for tax purposes',
          'Join returnee communities online'
        ]
      },
      {
        phase: 'Phase 2: Active Preparation (3-6 months out)',
        tasks: [
          'Address identified skill gaps through courses or certifications',
          'Begin job applications in home country',
          'Consult with international tax advisor',
          'Plan housing search strategy',
          'Notify current employer of intentions'
        ]
      },
      {
        phase: 'Phase 3: Transition (1-3 months before return)',
        tasks: [
          'Secure job offer or have active interviews',
          'Finalize housing arrangements remotely if possible',
          'Ship belongings / arrange logistics',
          'Close or transfer financial accounts',
          'Plan farewell events and goodbyes'
        ]
      },
      {
        phase: 'Phase 4: Reintegration (First 6 months back)',
        tasks: [
          'Join professional associations and attend networking events',
          'Establish new routines and social connections',
          'Monitor mental health and seek support if needed',
          'Evaluate progress quarterly against expectations',
          'Maintain international network connections'
        ]
      }
    ];
  };

  const analyzeReentry = async () => {
    setAnalyzing(true);
    setStep('analyzing');
    setShowRealityCheck(false);
    setRealityCheck(null);
    setAgentProgress({
      career: 'pending',
      financial: 'pending',
      cultural: 'pending',
      timing: 'pending'
    });
    
    try {
      const career = await analyzeCareerTransition(profile);
      const financial = await analyzeFinancials(profile);
      const cultural = await analyzeCulturalReintegration(profile);
      const timing = await analyzeOptimalTiming(profile, career, financial, cultural);
      
      const readinessScore = calculateReadinessScore(career, financial, cultural);
      const actionPlan = generateActionPlan();
      
      const finalResults = {
        readinessScore,
        careerTransition: career,
        financialRoadmap: financial,
        culturalReintegration: cultural,
        optimalTiming: timing,
        actionPlan,
        generatedAt: new Date().toISOString()
      };
      
      setResults(finalResults);
      setStep('results');
    } catch (err) {
      console.error('Analysis failed:', err);
      alert('Analysis failed. Please try again.');
      setStep('input');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const isProfileComplete = () => {
    return Object.values(profile).every(val => val.toString().trim() !== '');
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 75) return 'bg-green-50';
    if (score >= 50) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getAgentStatusIcon = (status) => {
    if (status === 'complete') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'analyzing') return <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />;
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
  };

  return (
  <div className="min-h-screen bg-red-500 p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-16 h-16 text-teal-600" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              ReEntry AI
            </h1>
          </div>
          <p className="text-gray-700 text-xl font-medium">AI-Powered Reverse Immigration Intelligence</p>
          <p className="text-gray-600 mt-2">Because going home shouldn't be harder than leaving</p>
        </div>

        {step === 'input' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <ArrowLeft className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">Plan Your Return Journey</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Maria Santos"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Home Country</label>
                <input
                  type="text"
                  placeholder="Brazil, India, Philippines, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.homeCountry}
                  onChange={(e) => handleInputChange('homeCountry', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Country</label>
                <input
                  type="text"
                  placeholder="USA, UK, Canada, Germany, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.currentCountry}
                  onChange={(e) => handleInputChange('currentCountry', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years Abroad</label>
                <input
                  type="number"
                  placeholder="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.yearsAbroad}
                  onChange={(e) => handleInputChange('yearsAbroad', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology / Software</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                <input
                  type="text"
                  placeholder="Senior Software Engineer, Manager, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Annual Salary (USD)</label>
                <input
                  type="number"
                  placeholder="85000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.currentSalary}
                  onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Savings (USD)</label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.savings}
                  onChange={(e) => handleInputChange('savings', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Status</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.familyStatus}
                  onChange={(e) => handleInputChange('familyStatus', e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="married with children">Married with children</option>
                  <option value="single parent">Single parent</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Reason for Return</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={profile.returnReason}
                  onChange={(e) => handleInputChange('returnReason', e.target.value)}
                >
                  <option value="">Select reason</option>
                  <option value="family obligations">Family obligations / care</option>
                  <option value="career advancement">Career advancement</option>
                  <option value="lifestyle preference">Lifestyle / cultural preference</option>
                  <option value="financial considerations">Financial considerations</option>
                  <option value="mission accomplished">Mission accomplished</option>
                  <option value="visa issues">Visa / legal issues</option>
                  <option value="homesickness">Homesickness</option>
                </select>
              </div>
            </div>

            <button
              onClick={analyzeReentry}
              disabled={!isProfileComplete() || analyzing}
              className={`w-full mt-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                isProfileComplete() && !analyzing
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {analyzing ? 'Analyzing...' : 'Generate My ReEntry Roadmap'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Analysis takes ~10 seconds. Four AI agents will analyze your profile.
            </p>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <Brain className="w-20 h-20 text-teal-600 mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analyzing Your Return Journey</h2>
              <p className="text-gray-600">Our AI agents are processing multiple dimensions...</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {getAgentStatusIcon(agentProgress.career)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Career Transition Agent</div>
                  <div className="text-sm text-gray-600">
                    {agentProgress.career === 'complete' && 'Role translation and market analysis complete ✓'}
                    {agentProgress.career === 'analyzing' && 'Analyzing job market and role equivalence...'}
                    {agentProgress.career === 'pending' && 'Waiting to start...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {getAgentStatusIcon(agentProgress.financial)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Financial Modeling Agent</div>
                  <div className="text-sm text-gray-600">
                    {agentProgress.financial === 'complete' && 'Financial projections and tax analysis complete ✓'}
                    {agentProgress.financial === 'analyzing' && 'Calculating costs, taxes, and income projections...'}
                    {agentProgress.financial === 'pending' && 'Waiting to start...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {getAgentStatusIcon(agentProgress.cultural)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Cultural Reintegration Agent</div>
                  <div className="text-sm text-gray-600">
                    {agentProgress.cultural === 'complete' && 'Reintegration forecast and strategies generated ✓'}
                    {agentProgress.cultural === 'analyzing' && 'Predicting adjustment challenges and timeline...'}
                    {agentProgress.cultural === 'pending' && 'Waiting to start...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {getAgentStatusIcon(agentProgress.timing)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Timing Optimization Agent</div>
                  <div className="text-sm text-gray-600">
                    {agentProgress.timing === 'complete' && 'Optimal timing calculated with confidence scores ✓'}
                    {agentProgress.timing === 'analyzing' && 'Optimizing return timing based on all factors...'}
                    {agentProgress.timing === 'pending' && 'Waiting to start...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && results && (
          <div className="space-y-6">
            <div className={`${getScoreBg(results.readinessScore)} border-2 border-teal-200 rounded-2xl shadow-xl p-8`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">ReEntry Readiness Score</h3>
                  <p className="text-gray-600">Based on career viability, financial readiness, and cultural preparedness</p>
                </div>
                <div className="text-center">
                  <div className={`text-7xl font-bold ${getScoreColor(results.readinessScore)}`}>
                    {results.readinessScore}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">out of 100</div>
                </div>
              </div>
            </div>

            {!showRealityCheck && !realityCheck && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Want the Unfiltered Truth?</h3>
                    <p className="text-gray-600">We've shown you the optimistic analysis. Ready for the hard realities?</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowRealityCheck(true);
                      runRealityCheck(profile, results);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    Show Me The Hard Truth
                  </button>
                </div>
              </div>
            )}

            {showRealityCheck && loadingRealityCheck && (
              <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-12">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-4">Running Reality Check...</h3>
                  <p className="text-gray-300">Analyzing blind spots and harsh truths...</p>
                </div>
              </div>
            )}

            {realityCheck && (
              <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-8 border-2 border-orange-500">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                  <h3 className="text-3xl font-bold">{realityCheck.title}</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold text-orange-400 mb-4">🚩 Blind Spots You Haven't Considered</h4>
                    <ul className="space-y-3">
                      {realityCheck.blindSpots.map((spot, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-gray-300">{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-red-400 mb-4">💔 Harsh Realities</h4>
                    <ul className="space-y-3">
                      {realityCheck.harshRealities.map((reality, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-300">{reality}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-yellow-400 mb-4">🤔 Critical Questions You Must Answer Honestly</h4>
                    <ul className="space-y-3">
                      {realityCheck.criticalQuestions.map((question, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span className="text-gray-300">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-purple-400 mb-4">😬 The Unsexy Truths Nobody Talks About</h4>
                    <ul className="space-y-3">
                      {realityCheck.unsexyTruths.map((truth, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-purple-500 mt-1">•</span>
                          <span className="text-gray-300">{truth}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-orange-500">
                    <h4 className="text-xl font-bold text-orange-400 mb-4">💬 Final Tough-Love Advice</h4>
                    <p className="text-gray-300 leading-relaxed">{realityCheck.finalAdvice}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-gray-800">Career Transition Analysis</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Role Translation</h4>
                  <p className="text-gray-600">{results.careerTransition.roleTranslation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Market Value</h4>
                  <p className="text-gray-600">Expected salary: {results.careerTransition.salaryRange}</p>
                  <p className="text-sm text-gray-500">Market demand: {results.careerTransition.demandLevel}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Your Advantages</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {results.careerTransition.advantages.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-gray-800">Your 18-Month Action Plan</h3>
              </div>
              <div className="space-y-6">
                {results.actionPlan.map((phase, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-gray-700 mb-2">{phase.phase}</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {phase.tasks.map((task, j) => (
                        <li key={j}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStep('input');
                setResults(null);
                setShowRealityCheck(false);
                setRealityCheck(null);
              }}
              className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all"
            >
              Analyze Another Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReEntryAI;