import React from 'react';
 
import {
  mockMember,
  mockMetrics,
  mockTestResults,
  mockPersonaAnalysis,
  mockDecisions
} from '../data/mockData';

const MemberProfile: React.FC = () => {
  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate engagement trend direction
  const engagementTrend = mockPersonaAnalysis.engagementTrend;
  const engagementDirection = engagementTrend[engagementTrend.length - 1] > engagementTrend[0] 
    ? 'up' : 'down';

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0 md:mr-8">
              <img 
                 
                src={mockMember.avatar} 
                alt={mockMember.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-800">{mockMember.name}</h1>
                <div className="flex items-center mt-2">
                  <span className="text-gray-600 mr-4">{mockMember.age} years, {mockMember.gender}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mockMember.status)}`}>
                    {mockMember.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600 font-medium">Current Plan</p>
                <p className="text-lg font-semibold text-gray-800">{mockMember.currentPlan}</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600 font-medium">Member Since</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(mockMember.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Primary Health Goals</h3>
                <ul className="space-y-2">
                  {mockMember.primaryGoals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Chronic Conditions</h3>
                <ul className="space-y-2">
                  {mockMember.chronicConditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Metrics Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Engagement Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl">
              <p className="text-sm text-indigo-600 font-medium">Weekly Doctor Hours</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {mockMetrics[mockMetrics.length - 1].doctorHours.toFixed(1)}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-green-600 font-medium">↓ 12% from peak</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl">
              <p className="text-sm text-indigo-600 font-medium">Weekly Coach Hours</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {mockMetrics[mockMetrics.length - 1].coachHours.toFixed(1)}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-green-600 font-medium">↑ 8% from start</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl">
              <p className="text-sm text-indigo-600 font-medium">Engagement Score</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {mockMetrics[mockMetrics.length - 1].engagementScore}
                <span className="text-lg">/100</span>
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${engagementDirection === 'up' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {engagementDirection === 'up' ? '↑' : '↓'} 23% since start
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl">
              <p className="text-sm text-indigo-600 font-medium">Adherence Rate</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {mockMetrics[mockMetrics.length - 1].adherenceRate}%
              </p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-green-600 font-medium">↑ 27% from start</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Test Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Test Results</h2>
          
          <div className="space-y-8">
            {mockTestResults.map((test, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{test.testType}</h3>
                    <p className="text-gray-500">
                      {new Date(test.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-gray-700 mb-3">Key Results</h4>
                    <div className="border border-gray-100 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Metric
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Value
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trend
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Object.entries(test.results).map(([metric, data], idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                {metric}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                {data.value}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  data.trend.includes('↓') ? 'bg-green-100 text-green-800' : 
                                  data.trend.includes('↑') ? 'bg-blue-100 text-blue-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {data.trend}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  data.status === 'optimal' ? 'bg-green-100 text-green-800' : 
                                  data.status === 'improved' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {data.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Interpretation</h4>
                    <p className="text-gray-600">{test.interpretation}</p>
                    
                    <h4 className="font-medium text-gray-700 mt-4 mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {test.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          <span className="text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Persona Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Behavioral Profile Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Profile</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Communication Style</p>
                  <p className="font-medium text-gray-800 capitalize">{mockPersonaAnalysis.communicationStyle}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Motivation Level</p>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${mockPersonaAnalysis.motivationLevel}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {mockPersonaAnalysis.motivationLevel}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Compliance Score</p>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${mockPersonaAnalysis.complianceScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {mockPersonaAnalysis.complianceScore}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Preferred Channels</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {mockPersonaAnalysis.preferredChannels.map((channel, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Strengths & Concerns</h3>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      {mockPersonaAnalysis.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2 ">✓</span>
                          <span className="text-gray-600">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Risk Factors</h4>
                    <ul className="space-y-2">
                      {mockPersonaAnalysis.riskFactors.map((risk, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-500 mr-2 ">⚠️</span>
                          <span className="text-gray-600">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Behavioral Insights</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Adherence Pattern</h4>
                      <p className="text-gray-600">{mockPersonaAnalysis.behavioralInsights.adherencePattern}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Learning Style</h4>
                      <p className="text-gray-600">{mockPersonaAnalysis.behavioralInsights.learningStyle}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Feedback Response</h4>
                      <p className="text-gray-600">{mockPersonaAnalysis.behavioralInsights.feedbackResponse}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decision Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Clinical Decision History</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Week
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Decision
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reasoning
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcomes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lessons Learned
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDecisions.map((decision, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(decision.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        Week {decision.week}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-indigo-600">{decision.decision}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{decision.reasoning}</div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="space-y-1">
                        {decision.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-sm text-gray-700">
                              <span className="font-medium">{outcome.metric}:</span> 
                              <span className={`ml-1 ${
                                outcome.change.includes('↑') ? 'text-green-600' : 
                                outcome.change.includes('↓') ? 'text-red-600' : 
                                'text-gray-600'
                              }`}>
                                {outcome.change} ({outcome.timeframe})
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {decision.lessonsLearned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;