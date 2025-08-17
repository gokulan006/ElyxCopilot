import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Info, ChevronRight, ArrowDown, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface Message {
  id: string;
  date: string;
  sender: string;
  role: string;
  message: string;
  topic: string;
  decision: string | null;
  reason: string | null;
  linked_to: string[];
  month: number;
}

const Copilot: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showReason, setShowReason] = useState<{visible: boolean, reason: string | null}>({visible: false, reason: null});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const conversationRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  
  const exportConversationsToPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Healthcare Conversation History', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.text('Complete journey with Joseph Martinez', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, yPosition);
      yPosition += 15;
      
      // Group messages by date
      const groupedMessages = conversations.reduce((groups: {[key: string]: Message[]}, message) => {
        const date = new Date(message.date).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
        return groups;
      }, {});
      
      // Add conversations
      Object.entries(groupedMessages).forEach(([, messages]) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Add date separator
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.text(formatDate(messages[0].date), 20, yPosition);
        yPosition += 10;
        
        messages.forEach((msg) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = 20;
          }
          
          // Add sender info
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`${msg.sender || 'Unknown'} (${msg.role || 'User'}) - ${formatTime(msg.date)}`, 20, yPosition);
          yPosition += 7;
          
          // Add message content
          pdf.setFontSize(9);
          const messageLines = pdf.splitTextToSize(msg.message, pageWidth - 40);
          pdf.text(messageLines, 25, yPosition);
          yPosition += messageLines.length * 4;
          
          // Add topic if available
          if (msg.topic) {
            pdf.setTextColor(128, 0, 128);
            pdf.text(`Topic: ${msg.topic}`, 25, yPosition);
            yPosition += 5;
          }
          
          // Add decision if available
          if (msg.decision) {
            pdf.setTextColor(0, 0, 128);
            pdf.text(`Decision: ${msg.decision}`, 25, yPosition);
            yPosition += 5;
          }
          
          // Add reason if available
          if (msg.reason) {
            pdf.setTextColor(128, 128, 0);
            const reasonLines = pdf.splitTextToSize(`Reason: ${msg.reason}`, pageWidth - 50);
            pdf.text(reasonLines, 25, yPosition);
            yPosition += reasonLines.length * 4;
          }
          
          yPosition += 5; // Space between messages
          pdf.setTextColor(0, 0, 0); // Reset color
        });
        
        yPosition += 5; // Space between dates
      });
      
      // Save the PDF
      pdf.save(`Joseph_Martinez_Conversations_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };
  // Load conversation data
  const [conversations, setConversations] = useState<Message[]>([]);

  useEffect(() => {
    fetch('/conversation.json')
      .then(response => response.json())
      .then(data => {
        setConversations(data);
        if (data.length > 0) {
          setSelectedMonth(data[0].month || 1);
        }
      })
      .catch(error => {
        console.error('Error loading conversations:', error);
        // Set some default data if loading fails
        setConversations([]);
        setSelectedMonth(1);
      });
  }, []);

  useEffect(() => {
    const container = conversationContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPosition = scrollTop + clientHeight;
      setShowScrollButton(scrollPosition < scrollHeight - 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Group messages by month for sidebar navigation
  const months = Array.from(new Set(conversations.map(msg => msg.month || 1))).sort((a, b) => a - b);

  const scrollToMessage = (messageId: string) => {
    conversationRefs.current[messageId]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    const element = conversationRefs.current[messageId];
    if (element) {
      element.classList.add('bg-blue-50', 'border-blue-200');
      setTimeout(() => {
        element.classList.remove('bg-blue-50', 'border-blue-200');
      }, 2000);
    }
  };

  const scrollToMonth = (month: number) => {
    const firstMessageOfMonth = conversations.find(msg => (msg.month || 1) === month);
    if (firstMessageOfMonth) {
      scrollToMessage(firstMessageOfMonth.id);
    }
    setSelectedMonth(month);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReasonClick = (reason: string) => {
    setShowReason({visible: true, reason});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const getMonthName = (monthNumber: number) => {
    // Since we have 32 weeks of data, treat each month number as a period/week
    if (monthNumber == 1) return `Month 1 `;
    if (monthNumber == 2) return `Month 2 `;
    if (monthNumber == 3) return `Month 3 `;
    if (monthNumber == 4) return `Month 4 `;
    if (monthNumber == 5) return `Month 5 `;
    if (monthNumber == 6) return `Month 6 `;
    if (monthNumber == 7) return `Month 7 `;
    if (monthNumber == 8) return `Month 8 `;
    return `Month ${monthNumber}`;
  };

  // Group messages by date for date separators
  const groupedMessages = conversations.reduce((groups: {[key: string]: Message[]}, message) => {
    const date = new Date(message.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Month Navigation Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Conversation History</h2>
          <p className="text-sm text-gray-600 mt-1">{months.length} months of healthcare conversations</p>
        </div>
        <div className="space-y-1 p-2">
          {months.map(month => (
            <button
              key={month}
              onClick={() => scrollToMonth(month)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors ${
                selectedMonth === month 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {getMonthName(month)}
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Healthcare Conversation History</h1>
              <p className="text-gray-600">Complete journey with Joseph Martinez</p>
            </div>
            <button 
              onClick={exportConversationsToPDF}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Conversations</span>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={conversationContainerRef}
          className="flex-1 overflow-y-auto bg-gray-50 p-4 relative"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {conversations.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">Loading conversations...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait while we load the conversation history</p>
                </div>
              </div>
            ) : Object.entries(groupedMessages).map(([date, messages]) => (
              <div key={date}>
                {/* Date Separator */}
                <div className="flex justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatDate(messages[0].date)}
                  </div>
                </div>

                {/* Messages for this date */}
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    ref={el => conversationRefs.current[msg.id] = el}
                    className={`flex ${msg.role === 'Member' ? 'justify-end' : 'justify-start'} mb-3 transition-all duration-300`}
                  >
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-3 shadow-sm ${
                      msg.role === 'Member' 
                        ? 'bg-green-100 rounded-tr-none border border-green-200' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}>
                      {/* Message Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-gray-700">
                          {msg.sender || 'Unknown'} ({msg.role || 'User'})
                        </div>
                        <div className="text-xs text-gray-500">
                          {getMonthName(msg.month || 1)}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="text-gray-800 mb-2 leading-relaxed">
                        {msg.message}
                      </div>

                      {/* Topic Badge */}
                      {msg.topic && (
                        <div className="mb-1">
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {msg.topic}
                          </span>
                        </div>
                      )}

                      {/* Decision Badge */}
                      {msg.decision && (
                        <div className="mb-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Decision: {msg.decision}
                          </span>
                        </div>
                      )}

                      {/* Message Footer */}
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {formatTime(msg.date)}
                        </div>
                        <div className="flex space-x-2">
                          {msg.linked_to && msg.linked_to.length > 0 && (
                            <button 
                              onClick={() => scrollToMessage(msg.linked_to[0])}
                              className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
                            >
                              Linked
                            </button>
                          )}
                          {msg.reason && (
                            <button
                              onClick={() => handleReasonClick(msg.reason!)}
                              className="text-xs text-orange-600 hover:underline flex items-center bg-orange-50 px-2 py-1 rounded"
                            >
                              <Info className="w-3 h-3 mr-1" />
                              Reason
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to Bottom Button */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Reason Popup Modal */}
      {showReason.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Decision Reasoning</h3>
              <button
                onClick={() => setShowReason({visible: false, reason: null})}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{showReason.reason}</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowReason({visible: false, reason: null})}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Copilot;
