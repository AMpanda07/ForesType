import React from 'react';
import { WordTrail } from '../components/games/WordTrail.jsx';
import { Keyboard } from 'lucide-react';

export const Practice = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Keyboard size={24} style={{ color: 'var(--color-accent-luminous)' }} />
        <h1 className="heading-display" style={{ fontSize: '1.75rem', margin: 0 }}>PRACTICE GROVE</h1>
      </div>

      <WordTrail
        onFinishSession={onFinishSession}
        onSelectAnotherGame={onSelectAnotherGame}
        onViewRecords={onViewRecords}
        profileName={profileName}
        onUpdateProfileName={onUpdateProfileName}
      />
    </div>
  );
};
