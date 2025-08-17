export interface Member {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  joinDate: string;
  currentPlan: string;
  status: 'active' | 'inactive';
}

export interface Conversation {
  id: string;
  week: number;
  progressScore: number;
  topic: string;
  summary: string;
}

export interface InternalMetrics {
  week: number;
  doctorHours: number;
  coachHours: number;
  consultations: number;
  engagementScore: number;
}

export interface TestResult {
  id: string;
  testType: string;
  date: string;
  results: Record<string, number>;
  normalRanges: Record<string, { min: number; max: number }>;
  interpretation: string;
  recommendations: string[];
}

export interface PersonaAnalysis {
  communicationStyle: string;
  motivationLevel: number;
  complianceScore: number;
  preferredTopics: string[];
  concerns: string[];
  strengths: string[];
  riskFactors: string[];
}

export interface Decision {
  id: string;
  week: number;
  decision: string;
  reasoning: string;
  outcome: string;
}