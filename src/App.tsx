import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PolicyIntelligenceEnhanced from '@/pages/PolicyIntelligenceEnhanced';
import HomePage from '@/pages/Home';
import KnowledgeGraphEnhanced from '@/pages/KnowledgeGraphEnhanced';
import AgentInference from '@/pages/AgentInference';
import PolicyResearch from '@/pages/PolicyResearch';
import FileManagement from '@/pages/FileManagement';
import BusinessSimulation from '@/pages/BusinessSimulation';
import BusinessImpactAnalysisEnhanced from '@/pages/BusinessImpactAnalysisEnhanced';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/policy" element={<PolicyIntelligenceEnhanced />} />
        <Route path="/impact" element={<BusinessImpactAnalysisEnhanced />} />
        <Route path="/simulation" element={<BusinessSimulation />} />
        <Route path="/knowledge" element={<KnowledgeGraphEnhanced />} />
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
