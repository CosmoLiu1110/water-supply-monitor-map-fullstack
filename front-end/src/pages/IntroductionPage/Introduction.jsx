import React, { useState } from 'react';
import TeamMemberInfo from './TeamMemberInfo.jsx';
import ProjectBackground from './ProjectBackground.jsx';
import References from './References.jsx';
import './Introduction.css';
const Introduction = () => {
  const [activeTab, setActiveTab] = useState('background');

  return (
    <div className="introduction-container">

      <div className="tabs">
        <button onClick={() => setActiveTab('background')} className={activeTab === 'background' ? 'active ' : ''}>About the Project</button>
        <button onClick={() => setActiveTab('team')} className={activeTab === 'team' ? 'active' : ''}>Meet The Team</button>
        <button onClick={() => setActiveTab('references')} className={activeTab === 'references' ? 'active' : ''}>References</button>
      </div>
      <div className="tab-content">
        {activeTab === 'background' && <ProjectBackground />}
        {activeTab === 'team' && <TeamMemberInfo />}
        {activeTab === 'references' && <References />}
      </div>
    </div>
  );
}
export default Introduction;
