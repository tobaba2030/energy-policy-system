import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PolicyIntelligence from '@/pages/PolicyIntelligence';
import HomePage from '@/pages/Home';
import KnowledgeGraph from '@/pages/KnowledgeGraph';
import AgentInference from '@/pages/AgentInference';
import PolicyResearch from '@/pages/PolicyResearch';
import FileManagement from '@/pages/FileManagement';
import BusinessSimulation from '@/pages/BusinessSimulation';
import BusinessImpactAnalysis from '@/pages/BusinessImpactAnalysis';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/policy" element={<PolicyIntelligence />} />
        <Route path="/impact" element={<BusinessImpactAnalysis />} />
        <Route path="/simulation" element={<BusinessSimulation />} />
        <Route path="/knowledge" element={<KnowledgeGraph />} />
        <Route path="/agent" element={<AgentInference />} />
        <Route path="/research" element={<PolicyResearch />} />
        <Route path="/files" element={<FileManagement />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
