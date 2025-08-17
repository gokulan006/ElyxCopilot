// JourneyTimeline.tsx
import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  keyMetrics: string[];
  isMilestone?: boolean;
}

interface JourneyTimelineProps {
  events: TimelineEvent[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Joseph's Journey Timeline</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-indigo-200"></div>
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative pl-12">
              {/* Dot */}
              <div className={`absolute left-0 top-1 h-4 w-4 rounded-full ${event.isMilestone ? 'bg-indigo-600 ring-4 ring-indigo-200' : 'bg-indigo-300'}`}></div>
              
              <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <p className="text-sm text-indigo-600 font-medium">{event.date}</p>
                <h4 className="text-lg font-semibold text-gray-800 mt-1">{event.title}</h4>
                <p className="text-gray-600 mt-2">{event.description}</p>
                
                {event.keyMetrics.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Key Metrics</p>
                    <ul className="mt-1 space-y-1">
                      {event.keyMetrics.map((metric, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;