import React, { useState, useRef } from 'react';
import { 
  TestTube, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  FileText,
  Download,
  Activity,
  Stethoscope,
  ArrowUpRight,
  ArrowDownRight,
  Droplets,
  ActivityIcon,
  Bone,
  Shield
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface TestMetric {
  value: string;
  status: string;
  trend: string;
}

interface TestPanel {
  id: string;
  testType: string;
  category: string;
  date: string;
  results: Record<string, TestMetric>;
  interpretation: string;
  physicianNotes?: string;
  recommendations: string[];
  trendData?: { date: string; value: number; note?: string }[];
  visualizations?: {
    lipidTrend?: {
      labels: string[];
      ldl: number[];
      hdl: number[];
      triglycerides: number[];
    };
    bpTrend?: {
      labels: string[];
      systolic: number[];
      diastolic: number[];
    };
  };
}

const TestResults: React.FC = () => {
  // Transform CSV data into test panels
  const testPanels: TestPanel[] = [
    {
      id: 'metabolic',
      testType: 'Metabolic Panel',
      category: 'Comprehensive',
      date: '2023-08-01',
      results: {
        'BMI': { value: '26.1', status: 'improved', trend: '↓ 1.7 since Jan' },
        'Blood Pressure': { value: '126/80', status: 'improved', trend: '↓ 10/8 since Jan' },
        'HbA1c': { value: '5.5%', status: 'optimal', trend: '↓ 0.7 since Jan' },
        'OGTT': { value: '118 mg/dL', status: 'improved', trend: '↓ 30 since Jan' },
      },
      interpretation: 'Significant improvement in metabolic markers. HbA1c now in normal range, blood pressure approaching optimal levels.',
      recommendations: [
        'Continue current dietary modifications and exercise regimen',
        'Monitor fasting glucose weekly',
        'Consider adding resistance training 2x/week to further improve insulin sensitivity'
      ],
      trendData: [
        { date: '2023-01-01', value: 27.8, note: 'Baseline' },
        { date: '2023-03-01', value: 27.1 },
        { date: '2023-06-01', value: 27.3 },
        { date: '2023-08-01', value: 26.1 },
      ],
      visualizations: {
        bpTrend: {
          labels: ['Jan', 'Mar', 'Jun', 'Aug'],
          systolic: [136, 132, 134, 126],
          diastolic: [88, 86, 85, 80]
        }
      }
    },
    {
      id: 'lipid',
      testType: 'Lipid Panel',
      category: 'Cardiovascular',
      date: '2023-08-01',
      results: {
        'LDL': { value: '105 mg/dL', status: 'improved', trend: '↓ 27 since Jan' },
        'HDL': { value: '50 mg/dL', status: 'optimal', trend: '↑ 11 since Jan' },
        'Triglycerides': { value: '150 mg/dL', status: 'improved', trend: '↓ 42 since Jan' },
        'Total Cholesterol': { value: '185 mg/dL', status: 'improved', trend: '↓ 22 since Jan' },
      },
      interpretation: 'Excellent progress in lipid profile. HDL has increased significantly while LDL and triglycerides have decreased.',
      physicianNotes: 'Patient has responded well to omega-3 supplementation and reduced saturated fat intake.',
      recommendations: [
        'Continue omega-3 supplementation (2000mg EPA/DHA daily)',
        'Increase fiber intake to 35g/day to further improve lipids',
        'Consider adding plant sterols if LDL remains above 100'
      ],
      visualizations: {
        lipidTrend: {
          labels: ['Jan', 'Mar', 'Jun', 'Aug'],
          ldl: [132, 124, 128, 105],
          hdl: [39, 44, 43, 50],
          triglycerides: [192, 178, 170, 150]
        }
      }
    },
    {
      id: 'inflammation',
      testType: 'Inflammation Panel',
      category: 'Systemic Health',
      date: '2023-08-01',
      results: {
        'CRP': { value: 'Normal', status: 'optimal', trend: '↓ from Slightly High' },
        'Vitamin D': { value: 'Optimal', status: 'optimal', trend: '↑ from Low' },
        'Omega-3 Index': { value: 'Optimal', status: 'optimal', trend: '↑ from Borderline' },
      },
      interpretation: 'Inflammatory markers normalized. Vitamin D status now optimal, likely contributing to reduced inflammation.',
      recommendations: [
        'Maintain current vitamin D dosage (5000 IU/day)',
        'Continue current omega-3 intake',
        'Monitor CRP annually unless symptoms arise'
      ]
    },
    {
      id: 'body-comp',
      testType: 'Body Composition',
      category: 'Fitness',
      date: '2023-08-01',
      results: {
        'Fat Mass': { value: '-3.2 kg', status: 'improved', trend: '↓ from Baseline' },
        'Muscle Mass': { value: '+1.8 kg', status: 'optimal', trend: '↑ from Baseline' },
        'VO2 Max': { value: '39', status: 'improved', trend: '↑ 7 since Jan' },
        'Grip Strength': { value: 'Good', status: 'improved', trend: '↑ from Below Avg' },
      },
      interpretation: 'Excellent body recomposition - significant fat loss with muscle gain. Cardiovascular fitness has improved substantially.',
      recommendations: [
        'Continue strength training 3x/week',
        'Add HIIT sessions 2x/week to further improve VO2 max',
        'Ensure protein intake of 1.6g/kg body weight'
      ],
      trendData: [
        { date: '2023-01-01', value: 32, note: 'Baseline' },
        { date: '2023-03-01', value: 35 },
        { date: '2023-06-01', value: 34 },
        { date: '2023-08-01', value: 39 },
      ]
    }
  ];

  const [selectedTest, setSelectedTest] = useState<TestPanel>(testPanels[0]);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'improved':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'monitor':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'text-green-600 bg-green-50';
      case 'improved':
        return 'text-blue-600 bg-blue-50';
      case 'monitor':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getTestIcon = (testType: string) => {
    switch (testType) {
      case 'Metabolic Panel':
        return <ActivityIcon className="w-5 h-5 text-blue-600" />;
      case 'Lipid Panel':
        return <Droplets className="w-5 h-5 text-red-600" />;
      case 'Inflammation Panel':
        return <Shield className="w-5 h-5 text-purple-600" />;
      case 'Body Composition':
        return <Bone className="w-5 h-5 text-green-600" />;
      default:
        return <TestTube className="w-5 h-5 text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const prepareChartData = () => {
    if (!selectedTest.trendData) return [];
    
    return selectedTest.trendData.map(item => ({
      name: formatDate(item.date),
      value: item.value,
      note: item.note
    }));
  };

  const prepareLipidChartData = () => {
    if (!selectedTest.visualizations?.lipidTrend) return [];
    
    return selectedTest.visualizations.lipidTrend.labels.map((label, index) => ({
      name: label,
      LDL: selectedTest.visualizations.lipidTrend.ldl[index],
      HDL: selectedTest.visualizations.lipidTrend.hdl[index],
      Triglycerides: selectedTest.visualizations.lipidTrend.triglycerides[index]
    }));
  };

  const prepareBPTrendData = () => {
    if (!selectedTest.visualizations?.bpTrend) return [];
    
    return selectedTest.visualizations.bpTrend.systolic.map((_, index) => ({
      name: selectedTest.visualizations?.bpTrend?.labels?.[index] || `Point ${index + 1}`,
      Systolic: selectedTest.visualizations.bpTrend.systolic[index],
      Diastolic: selectedTest.visualizations.bpTrend.diastolic[index]
    }));
  };

  const chartData = prepareChartData();
  const lipidData = prepareLipidChartData();
  const bpData = prepareBPTrendData();

  const exportAllTestResultsToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(`Joseph Martinez - Comprehensive Health Report`, 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 30);
    doc.text(`Physician: Dr. Warren`, 15, 36);
    
    let currentY = 45;
    
    testPanels.forEach((panel, panelIndex) => {
      
      if (panelIndex > 0) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(41, 128, 185);
      doc.text(`${panel.testType} (${panel.category})`, 15, currentY);
      currentY += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Test Date: ${formatDate(panel.date)}`, 15, currentY);
      currentY += 10;
      
       
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Key Metrics', 15, currentY);
      currentY += 7;
      
      const metricsData = Object.entries(panel.results).map(([metric, data]) => [
        metric, 
        data.value, 
        data.status.charAt(0).toUpperCase() + data.status.slice(1),
        data.trend
      ]);
      
      autoTable(doc, {
        startY: currentY,
        head: [['Metric', 'Value', 'Status', 'Trend']],
        body: metricsData,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        columnStyles: {
          0: { fontStyle: 'bold' },
          2: { cellWidth: 30 },
          3: { cellWidth: 40 }
        }
      });
      
      currentY = doc.lastAutoTable.finalY + 10;
      
       
      doc.setFontSize(14);
      doc.text('Clinical Interpretation', 15, currentY);
      currentY += 7;
      
      doc.setFontSize(11);
      const interpretationLines = doc.splitTextToSize(panel.interpretation, 180);
      doc.text(interpretationLines, 15, currentY);
      currentY += interpretationLines.length * 7 + 10;
        
      if (panel.physicianNotes) {
        doc.setFontSize(14);
        doc.text('Physician Notes', 15, currentY);
        currentY += 7;
        
        doc.setFontSize(11);
        const notesLines = doc.splitTextToSize(panel.physicianNotes, 180);
        doc.text(notesLines, 15, currentY);
        currentY += notesLines.length * 7 + 10;
      }
      
       
      if (panel.recommendations.length > 0) {
        doc.setFontSize(14);
        doc.text('Recommendations', 15, currentY);
        currentY += 7;
        
        doc.setFontSize(11);
        
        panel.recommendations.forEach((rec, index) => {
          const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 180);
          doc.text(recLines, 20, currentY);
          currentY += recLines.length * 7 + 5;
        });
      }
      
       
      currentY += 10;
    });
    
     
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 287);
    }
    
     
    doc.save(`Joseph_Health_Comprehensive_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Biomarker Analysis</h1>
            <p className="text-gray-600 mt-2">
              Comprehensive diagnostic insights for Joseph Health • {selectedTest.category}
            </p>
          </div>
          <button 
            onClick={exportAllTestResultsToPDF}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Clinical Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Diagnostic Panels</h2>
              <p className="text-sm text-gray-500 mt-1">Select a panel to view detailed results</p>
            </div>
            <div className="p-4 space-y-3">
              {testPanels.map((test) => (
                <button
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTest.id === test.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {getTestIcon(test.testType)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{test.testType}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {test.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(test.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
            </div>
            <div className="p-4">
              {Object.entries(selectedTest.results).map(([key, metric]) => (
                <div key={key} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{key}</span>
                    <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                      {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-600 ml-2">{metric.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Details */}
        <div className="lg:col-span-2 space-y-6" ref={chartContainerRef}>
          {/* Test Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedTest.testType}</h2>
                <p className="text-gray-600">{selectedTest.category} • {new Date(selectedTest.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Dr. Warren</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(selectedTest.results).map(([key, metric]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{key}</h3>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {metric.trend.includes('↓') ? (
                      <ArrowDownRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : metric.trend.includes('↑') ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : null}
                    <span className="text-xs text-gray-600">{metric.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interpretation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Clinical Interpretation</h3>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <Activity className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">{selectedTest.interpretation}</p>
                </div>
              </div>
              
              {/* Physician Notes */}
              {selectedTest.physicianNotes && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Physician Notes</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">{selectedTest.physicianNotes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Recommendations</h3>
              <div className="space-y-3">
                {selectedTest.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Trends */}
          {chartData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Biomarker Trends</h3>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-gray-100 rounded-lg">3M</button>
                  <button className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">6M</button>
                  <button className="text-xs px-3 py-1 bg-gray-100 rounded-lg">1Y</button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value) => [`${value}`, 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                      name="Biomarker Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Lipid Profile Trends */}
          {lipidData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lipid Profile Evolution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lipidData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="LDL" fill="#ef4444" name="LDL (mg/dL)" />
                    <Bar dataKey="HDL" fill="#10b981" name="HDL (mg/dL)" />
                    <Bar dataKey="Triglycerides" fill="#f59e0b" name="Triglycerides (mg/dL)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Blood Pressure Trends */}
          {bpData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Pressure Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bpData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Systolic" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Systolic (mmHg)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Diastolic" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Diastolic (mmHg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResults;
