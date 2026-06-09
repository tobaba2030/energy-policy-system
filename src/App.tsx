import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PolicyIntelligence from '@/pages/PolicyIntelligence';
import CarbonSandbox from '@/pages/CarbonSandbox';
import HomePage from '@/pages/Home';
import KnowledgeGraph from '@/pages/KnowledgeGraph';
import AgentInference from '@/pages/AgentInference';
import PolicyResearch from '@/pages/PolicyResearch';
import FileManagement from '@/pages/FileManagement';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/policy" element={<PolicyIntelligence />} />
        <Route path="/sandbox" element={<CarbonSandbox />} />
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