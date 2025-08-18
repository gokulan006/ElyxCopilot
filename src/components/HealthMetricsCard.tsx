import React from 'react';

interface Metric {
  name: string;
  value: string | number;
  change?: string;
  unit?: string;
  improvement?: boolean;
}

interface HealthMetricsCardProps {
  title: string;
  metrics: Metric[];
}

const HealthMetricsCard: React.FC<HealthMetricsCardProps> = ({ title, metrics }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="border-l-4 border-indigo-500 pl-4 py-1">
            <p className="text-sm text-gray-500">{metric.name}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-bold text-gray-800">
                {metric.value}
                {metric.unit && <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>}
              </p>
              {metric.change && (
                <span className={`ml-2 text-sm font-medium ${metric.improvement ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMetricsCard;
