import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Copilot from './components/Copilot';
import TestResults from './components/TestResults';
import MemberProfile from './components/MemberProfile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'copilot':
        return <Copilot />;
      case 'tests':
        return <TestResults />;
      case 'persona':
        return <MemberProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;