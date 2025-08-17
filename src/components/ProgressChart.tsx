// src/components/ProgressChart.tsx
import React from 'react';
import Tooltip from './Tooltip';

interface Episode {
  date: string;
  title: string;
  progress: number;
  metrics: {
    responseTime: string;
    resolutionTime: string;
  };
  healthMarkers?: {
    bp: string;
    glucose: number;
    crp: number;
  };
}

interface ProgressChartProps {
  episodes: Episode[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500 bg-white rounded-xl shadow">
        Loading health journey data...
      </div>
    );
  }

  // Calculate chart dimensions
  const chartHeight = 300;
  const chartWidth = 800;
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };

  // Process episode data
  const processedData = episodes.map((episode, index) => ({
    ...episode,
    x: margin.left + (index * (chartWidth - margin.left - margin.right) / (episodes.length - 1)),
    y: chartHeight - margin.bottom - (episode.progress * (chartHeight - margin.top - margin.bottom) / 100)
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Joseph's Health Journey Progress</h3>
      <p className="text-gray-500 mb-6">Tracking key milestones and health improvements over time</p>
      
      <div className="overflow-x-auto">
        <svg 
          width="100%" 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="min-w-[800px]"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1={margin.left}
                y1={chartHeight - margin.bottom - (value * (chartHeight - margin.top - margin.bottom) / 100)}
                x2={chartWidth - margin.right}
                y2={chartHeight - margin.bottom - (value * (chartHeight - margin.top - margin.bottom) / 100)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x={margin.left - 10}
                y={chartHeight - margin.bottom - (value * (chartHeight - margin.top - margin.bottom) / 100) + 4}
                fontSize="12"
                fill="#6b7280"
                textAnchor="end"
              >
                {value}%
              </text>
            </g>
          ))}

          {/* Progress line */}
          <polyline
            points={processedData.map(d => `${d.x},${d.y}`).join(' ')}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data points with tooltips */}
          {processedData.map((data, index) => (
            <g key={index}>
              <Tooltip>
                <div className="p-2 bg-white shadow-lg rounded-lg border border-gray-200 min-w-[200px]">
                  <h4 className="font-semibold text-indigo-600">{data.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{data.date}</p>
                  <div className="mt-2">
                    <p className="text-sm"><span className="font-medium">Progress:</span> {data.progress}%</p>
                    <p className="text-sm"><span className="font-medium">Response:</span> {data.metrics.responseTime}</p>
                    <p className="text-sm"><span className="font-medium">Resolution:</span> {data.metrics.resolutionTime}</p>
                    {data.healthMarkers && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Health Markers:</p>
                        <p className="text-sm"><span className="font-medium">BP:</span> {data.healthMarkers.bp}</p>
                        <p className="text-sm"><span className="font-medium">Glucose:</span> {data.healthMarkers.glucose} mg/dL</p>
                        <p className="text-sm"><span className="font-medium">CRP:</span> {data.healthMarkers.crp} mg/L</p>
                      </div>
                    )}
                  </div>
                </div>
              </Tooltip>
              <circle
                cx={data.x}
                cy={data.y}
                r="6"
                fill="#4f46e5"
                className="cursor-pointer hover:r-8 transition-all"
              />

              {/* Episode labels */}
              <text
                x={data.x}
                y={chartHeight - 15}
                fontSize="10"
                fill="#6b7280"
                textAnchor="middle"
              >
                E{index + 1}
              </text>
            </g>
          ))}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={chartHeight - margin.bottom}
            x2={chartWidth - margin.right}
            y2={chartHeight - margin.bottom}
            stroke="#d1d5db"
            strokeWidth="1"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={chartHeight - margin.bottom}
            stroke="#d1d5db"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressChart;