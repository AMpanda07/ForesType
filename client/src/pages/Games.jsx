import React, { useState } from 'react';
import { WordTrail } from '../components/games/WordTrail.jsx';
import { ForestRush } from '../components/games/ForestRush.jsx';
import { DeepCavern } from '../components/games/DeepCavern.jsx';
import { EndlessGrove } from '../components/games/EndlessGrove.jsx';
import { SporeFall } from '../components/games/SporeFall.jsx';
import { Thorns } from '../components/games/Thorns.jsx';
import { PrecisionChallenge } from '../components/games/PrecisionChallenge.jsx';
import { Pathfinder } from '../components/games/Pathfinder.jsx';
import { KeyboardRunes } from '../components/games/KeyboardRunes.jsx';
import { Gamepad2, ArrowLeft, Zap, Target, Infinity as InfinityIcon, Sparkles, ShieldAlert, Activity, Compass, Keyboard } from 'lucide-react';

export const Games = ({
  selectedGameId = null,
  onFinishSession,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [activeGame, setActiveGame] = useState(selectedGameId && selectedGameId !== 'all' ? selectedGameId : null);

  const gamesCatalog = [
    { id: 'classic', name: 'Word Trail', desc: 'Standard typing practice mode with customizable time.', icon: Keyboard },
    { id: 'speed_rush', name: 'Forest Rush', desc: '30-second rapid fire speed burst with multipliers.', icon: Zap },
    { id: 'accuracy', name: 'Deep Cavern', desc: 'High accuracy mode with heavy error penalties.', icon: Target },
    { id: 'endless', name: 'Endless Grove', desc: 'Continuous stream with ramping difficulty tiers.', icon: InfinityIcon },
    { id: 'spore_fall', name: 'Spore Fall', desc: 'Falling words descending from top canopy.', icon: Sparkles },
    { id: 'word_survival', name: 'Thorn Survival', desc: 'Zero-mistake single typo game over mode.', icon: ShieldAlert },
    { id: 'precision', name: 'Precision Diagnostics', desc: 'Identifies weakest mistyped characters.', icon: Activity },
    { id: 'progressive', name: 'Pathfinder', desc: 'Level 1 to 5 progression from words to code.', icon: Compass },
    { id: 'keyboard_trainer', name: 'Keyboard Runes', desc: 'On-screen virtual keyboard finger drills.', icon: Keyboard }
  ];

  const handleSelectGame = (id) => {
    setActiveGame(id);
  };

  const handleBackToMenu = () => {
    setActiveGame(null);
  };

  const renderGameComponent = () => {
    switch (activeGame) {
      case 'classic':
        return <WordTrail onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'speed_rush':
        return <ForestRush onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'accuracy':
        return <DeepCavern onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'endless':
        return <EndlessGrove onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'spore_fall':
        return <SporeFall onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'word_survival':
        return <Thorns onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'precision':
        return <PrecisionChallenge onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'progressive':
        return <Pathfinder onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      case 'keyboard_trainer':
        return <KeyboardRunes onFinishSession={onFinishSession} onSelectAnotherGame={handleBackToMenu} onViewRecords={onViewRecords} profileName={profileName} onUpdateProfileName={onUpdateProfileName} />;
      default:
        return null;
    }
  };

  if (activeGame) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1rem 0' }}>
        <button onClick={handleBackToMenu} className="btn-forest btn-forest-outline" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft size={16} /> Back to All Games
        </button>
        {renderGameComponent()}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Gamepad2 size={24} style={{ color: 'var(--color-accent-luminous)' }} />
        <h1 className="heading-display" style={{ fontSize: '1.75rem', margin: 0 }}>TYPING GAMES & DRILLS</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem'
      }}>
        {gamesCatalog.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              onClick={() => handleSelectGame(g.id)}
              className="forest-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent-luminous)',
                  marginBottom: '1rem'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>{g.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{g.desc}</p>
              </div>

              <div style={{
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-accent-luminous)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                LAUNCH GAME →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
