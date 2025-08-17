import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import JourneyTimeline from './JourneyTimeline';

const Dashboard = () => {
  const supportHoursData = [
    { month: 'Jan', doctor: 6, coach: 12, dietitian: 8, travel: 0, total: 26 },
    { month: 'Feb', doctor: 5, coach: 13, dietitian: 8, travel: 0, total: 26 },
    { month: 'Mar', doctor: 5, coach: 14, dietitian: 9, travel: 3, total: 31 },
    { month: 'Apr', doctor: 6, coach: 15, dietitian: 9, travel: 2, total: 32 },
    { month: 'May', doctor: 7, coach: 15, dietitian: 10, travel: 3, total: 35 },
    { month: 'Jun', doctor: 8, coach: 16, dietitian: 10, travel: 4, total: 38 },
    { month: 'Jul', doctor: 7, coach: 15, dietitian: 11, travel: 5, total: 38 },
    { month: 'Aug', doctor: 7, coach: 15, dietitian: 12, travel: 5, total: 39 }
  ];

  const behavioralData = [
    { month: 'Jan', motivation: 3, discipline: 3, adaptability: 2, stress: 2, engagement: 3 },
    { month: 'Feb', motivation: 4, discipline: 3, adaptability: 3, stress: 3, engagement: 3 },
    { month: 'Mar', motivation: 5, discipline: 3, adaptability: 3, stress: 3, engagement: 5 },
    { month: 'Apr', motivation: 5, discipline: 4, adaptability: 3, stress: 4, engagement: 5 },
    { month: 'May', motivation: 5, discipline: 5, adaptability: 4, stress: 5, engagement: 5 },
    { month: 'Jun', motivation: 5, discipline: 5, adaptability: 4, stress: 5, engagement: 5 },
    { month: 'Jul', motivation: 6, discipline: 5, adaptability: 5, stress: 6, engagement: 6 },
    { month: 'Aug', motivation: 6, discipline: 5, adaptability: 5, stress: 6, engagement: 6 }
  ];

  // Behavioral scale mapping
  const behavioralScale = {
    1: 'Very Low',
    2: 'Low/Medium-Low',
    3: 'Medium',
    4: 'Medium-High',
    5: 'High',
    6: 'Very High'
  };

  // Timeline events data  
  const timelineEvents = [
    {
      date: "Jan 15–20, 2025",
      title: "Initial Onboarding",
      description: "Joseph joins Elyx to manage high blood pressure and borderline diabetes. Baseline health data collected and 32-week lifestyle plan created.",
      keyMetrics: ["Response Time: 35 min", "Resolution: 5 days", "BP: 145/92 mmHg", "Glucose: 112 mg/dL"],
      isMilestone: true
    },
    {
      date: "Jan 22, 2025",
      title: "First Plan Delivery",
      description: "Joseph receives exercise and diet plan. Asks about benefits of TRE fasting vs calorie counting.",
      keyMetrics: ["Curiosity question answered", "TRE benefits explained"],
      isMilestone: false
    },
    {
      date: "Feb 1, 2025",
      title: "Travel Challenge",
      description: "Joseph struggles with adherence during domestic trip. Plan adjusted for travel-friendly options.",
      keyMetrics: ["Response Time: 2h 15m", "Resolution: 3 days", "Adherence maintained at 70%"],
      isMilestone: false
    },
    {
      date: "Apr 15–20, 2025",
      title: "3-Month Diagnostic",
      description: "First comprehensive diagnostic panel shows significant improvements. Omega-3 supplementation recommended.",
      keyMetrics: ["BP: 130/84 mmHg", "CRP reduced", "Glucose: 102 mg/dL", "Response Time: 1h 10m"],
      isMilestone: true
    },
    {
      date: "May 10–15, 2025",
      title: "Travel Adaptation",
      description: "Joseph faces challenges during business trip. Provided with hotel-room workouts and frozen veggie guidance.",
      keyMetrics: ["Response Time: 45 min", "Resolution: 2 days", "70% adherence maintained"],
      isMilestone: false
    },
    {
      date: "July 2025",
      title: "BP Spike Incident",
      description: "Joseph logs sudden BP spike (145/92 mmHg). Escalated to Dr. Warren who identified stress and sleep factors.",
      keyMetrics: ["Response Time: 1 hour", "Resolution: 4 days", "Stress management plan implemented"],
      isMilestone: false
    },
    {
      date: "Aug 25–30, 2025",
      title: "8-Month Breakthrough",
      description: "Diagnostic panel shows dramatic improvements. Joseph achieves controlled BP and glucose, with CRP reduced by >50%.",
      keyMetrics: ["BP: 124/78 mmHg", "Glucose: 98 mg/dL", "CRP: 2.3 mg/L", "LDL: 122 mg/dL"],
      isMilestone: true
    }
  ];

  // Custom tooltip for behavioral chart
  const BehavioralTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {behavioralScale[entry.value as keyof typeof behavioralScale]}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Joseph Martinez's Health Journey Dashboard</h1>
            <p className="text-gray-600 mt-2">52-year-old male from Singapore | Tracking progress since January 15, 2025</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-500">Current Persona</p>
            <p className="text-gray-800 font-medium">Resilient Optimizer (August)</p>
          </div>
        </div>

        {/* Support Hours Breakdown */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Support Hours Breakdown</h3>
            <p className="text-gray-600 mb-6">Monthly allocation of support hours across different specialties</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={supportHoursData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="doctor" fill="#6366f1" name="Doctor Hours" />
                  <Bar dataKey="coach" fill="#10b981" name="Coach Hours" />
                  <Bar dataKey="dietitian" fill="#f59e0b" name="Dietitian Hours" />
                  <Bar dataKey="travel" fill="#ef4444" name="Travel Support Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Support Hours Trend */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Support Hours Trend</h3>
            <p className="text-gray-600 mb-6">Monthly progression of total support hours</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={supportHoursData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    strokeWidth={2}
                    name="Total Support Hours"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Behavioral Metrics Trend */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Behavioral Metrics Trend</h3>
            <p className="text-gray-600 mb-6">Monthly evolution of key behavioral indicators</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={behavioralData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[1, 6]} 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => behavioralScale[value as keyof typeof behavioralScale]}
                  />
                  <Tooltip content={<BehavioralTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="motivation" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Motivation"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="discipline" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Discipline"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adaptability" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Adaptability"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Stress Handling"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Engagement"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <JourneyTimeline events={timelineEvents} />

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Journey Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-80">Starting Support</p>
              <p className="text-lg font-semibold mt-1">26 Hours</p>
              <p className="text-sm opacity-80 mt-2">No travel support</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-80">Peak Support</p>
              <p className="text-lg font-semibold mt-1">39 Hours</p>
              <p className="text-sm opacity-80 mt-2">5h travel support</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-80">Behavioral Growth</p>
              <p className="text-lg font-semibold mt-1">+30% Adaptability</p>
              <p className="text-sm opacity-80 mt-2">Low → High</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="font-medium">Key Insight:</p>
            <p className="mt-2">
              Joseph Martinez's support needs evolved from 26 to 39 hours monthly, with travel support emerging as a critical component.
              His behavioral metrics show remarkable improvement, particularly in adaptability (+30%) and stress handling,
              correlating with his persona progression to "Resilient Optimizer." The increased dietitian hours (50%) and
              consistent coaching support were instrumental in maintaining adherence during challenging periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;