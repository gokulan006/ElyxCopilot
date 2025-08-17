import { Member, InternalMetrics, TestResult, PersonaAnalysis, Decision } from '../types';

// Mock member data
export const mockMember: Member = {
  id: '1',
  name: 'Joseph Martinez',
  age: 52,
  gender: 'Male',
  avatar: 'https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  joinDate: '2024-01-15',
  currentPlan: 'Comprehensive Health Program',
  status: 'active',
  primaryGoals: ['Reduce cardiovascular risk', 'Improve metabolic health', 'Enhance cognitive performance'],
  chronicConditions: ['Hypertension (controlled)', 'Prediabetes (resolved)']
};

// Enhanced metrics with trends
export const mockMetrics: InternalMetrics[] = Array.from({ length: 32 }, (_, i) => ({
  week: i + 1,
  month: Math.floor(i/4) + 1,
  doctorHours: Math.max(0.5, (Math.sin(i/3) * 0.8 + 1.5)),
  coachHours: Math.max(1.0, (Math.cos(i/4) * 0.6 + 2.0)),
  consultations: [1, 1, 2, 3][i % 4],
  engagementScore: 80 + (i % 20),
  adherenceRate: 65 + (i % 30),
  biometricReadings: Math.floor(3 + Math.random() * 4)
}));

// Professional test results with visualization-ready data
export const mockTestResults: TestResult[] = [
  {
    id: 'test-1',
    testType: 'Quarterly Comprehensive Panel',
    date: '2024-02-15',
    category: 'Metabolic Health',
    trendData: [
      { date: '2024-01-01', value: 98, note: 'Initial baseline' },
      { date: '2024-02-15', value: 95, note: 'After dietary changes' },
      { date: '2024-05-20', value: 89, note: 'With exercise regimen' },
      { date: '2024-08-10', value: 85, note: 'Current reading' }
    ],
    results: {
      'Fasting Glucose (mg/dL)': { value: 85, trend: '↓ 15%', status: 'optimal' },
      'HbA1c (%)': { value: 5.4, trend: '↓ 0.8%', status: 'improved' },
      'LDL Cholesterol (mg/dL)': { value: 98, trend: '↓ 22%', status: 'improved' },
      'HDL Cholesterol (mg/dL)': { value: 52, trend: '↑ 18%', status: 'improved' },
      'Triglycerides (mg/dL)': { value: 110, trend: '↓ 30%', status: 'improved' }
    },
    visualizations: {
      glucoseTrend: [98, 95, 89, 85],
      lipidTrend: {
        labels: ['Jan', 'Feb', 'May', 'Aug'],
        ldl: [125, 115, 105, 98],
        hdl: [44, 46, 49, 52],
        triglycerides: [157, 140, 125, 110]
      }
    },
    interpretation: 'Significant improvement across all metabolic markers. Glucose control excellent, lipid profile now in optimal range.',
    recommendations: [
      'Continue Mediterranean diet protocol',
      'Maintain current exercise frequency',
      'Next test scheduled for November 2024'
    ],
    physicianNotes: 'Patient has shown remarkable adherence to lifestyle changes. Consider reducing metformin dosage at next visit.'
  },
  {
    id: 'test-2',
    testType: 'Cardiovascular Risk Panel',
    date: '2024-05-20',
    category: 'Cardiac Health',
    trendData: [
      { date: '2024-01-01', value: 2.8, note: 'High risk' },
      { date: '2024-05-20', value: 1.2, note: 'Moderate risk' },
      { date: '2024-08-10', value: 0.8, note: 'Low risk' }
    ],
    results: {
      'C-Reactive Protein (mg/L)': { value: 0.8, trend: '↓ 71%', status: 'optimal' },
      'ApoB (mg/dL)': { value: 80, trend: '↓ 25%', status: 'improved' },
      'Coronary Calcium Score': { value: 15, trend: '→ stable', status: 'monitor' },
      'Blood Pressure (mmHg)': { value: '122/78', trend: '↓ 18/12', status: 'improved' }
    },
    visualizations: {
      inflammationTrend: [3.2, 1.8, 0.8],
      apoBTrend: [107, 92, 80],
      bpTrend: {
        systolic: [140, 130, 122],
        diastolic: [90, 82, 78]
      }
    },
    interpretation: 'Dramatic reduction in inflammatory markers. Atherogenic lipoprotein profile significantly improved. Blood pressure now in normal range.',
    recommendations: [
      'Continue omega-3 supplementation',
      'Maintain sodium restriction',
      'Repeat calcium score in 2 years'
    ],
    physicianNotes: 'Cardiovascular risk reduced from 8.5% to 3.2% (10-year ASCVD risk). Excellent progress.'
  }
];

// Enhanced persona analysis
export const mockPersonaAnalysis: PersonaAnalysis = {
  communicationStyle: 'data-driven',
  motivationLevel: 92,
  complianceScore: 88,
  engagementTrend: [65, 72, 80, 85, 88],
  preferredChannels: ['Secure messaging', 'Video calls', 'Data dashboard'],
  preferredTopics: ['Biomarker optimization', 'Exercise physiology', 'Nutrition science', 'Sleep architecture'],
  concerns: ['Maintaining progress during travel', 'Time efficiency', 'Decision fatigue'],
  strengths: ['Analytical mindset', 'High intrinsic motivation', 'Consistent with tracking', 'Open to experimentation'],
  riskFactors: ['High-stress occupation', 'International travel (jet lag)', 'Evening work habits'],
  behavioralInsights: {
    adherencePattern: 'High consistency with structured plans, struggles with improvisation',
    learningStyle: 'Prefers research-backed explanations with actionable steps',
    feedbackResponse: 'Responds well to quantitative progress metrics'
  }
};

// Decision tracking with outcomes
export const mockDecisions: Decision[] = [
  {
    id: 'decision-1',
    date: '2024-02-10',
    week: 4,
    decision: 'Implement time-restricted eating',
    reasoning: 'Elevated fasting glucose despite dietary changes',
    metricsTracked: ['Fasting glucose', 'Weight', 'Energy levels'],
    outcomes: [
      { metric: 'Fasting glucose', change: '↓ 12%', timeframe: '8 weeks' },
      { metric: 'Evening energy', change: '↑ 30%', timeframe: '4 weeks' }
    ],
    lessonsLearned: '8-hour window more effective than 10-hour for glucose control'
  },
  {
    id: 'decision-2',
    date: '2024-04-15',
    week: 12,
    decision: 'Switch to polarized training model',
    reasoning: 'Plateau in VO2 max improvements with steady-state cardio',
    metricsTracked: ['VO2 max', 'HRV', 'Recovery time'],
    outcomes: [
      { metric: 'VO2 max', change: '↑ 8%', timeframe: '12 weeks' },
      { metric: 'Training enjoyment', change: '↑ 45%', timeframe: '2 weeks' }
    ],
    lessonsLearned: 'High-intensity intervals better tolerated than expected'
  },
  {
    id: 'decision-3',
    date: '2024-07-20',
    week: 24,
    decision: 'Add CGM for metabolic insight',
    reasoning: 'Need for real-time glucose response data',
    metricsTracked: ['Glucose variability', 'Postprandial spikes', 'Sleep glucose'],
    outcomes: [
      { metric: 'Glucose variability', change: '↓ 35%', timeframe: '4 weeks' },
      { metric: 'Awareness of food effects', change: '↑ 90%', timeframe: '1 week' }
    ],
    lessonsLearned: 'Identified unexpected carb sensitivities'
  }
];

// Empty conversations array to be populated from JSON
export const mockConversations: any[] = [];