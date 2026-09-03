import React from 'react';
import { Gamepad2, Trophy, ArrowRight, Sparkles, Target, Zap, Infinity as InfinityIcon, ShieldAlert, Activity, Compass, Keyboard } from 'lucide-react';

export const Home = ({
  onSelectGame,
  stats = {},
  records = [],
  profileName
}) => {
  const gamesList = [
    {
      id: 'classic',
      name: 'WORD TRAIL',
      desc: 'Standard typing test with customizable time and difficulty.',
      difficulty: 'Adaptable',
      skill: 'Baseline WPM & Accuracy',
      icon: Keyboard,
      color: 'var(--color-accent-primary)'
    },
    {
      id: 'speed_rush',
      name: 'FOREST RUSH',
      desc: '30-second rapid speed burst with combo multipliers.',
      difficulty: 'High Speed',
      skill: 'Burst Speed & Reflexes',
      icon: Zap,
      color: 'var(--color-warm-highlight)'
    },
    {
      id: 'accuracy',
      name: 'DEEP CAVERN',
      desc: 'Precision mode with high penalty for incorrect characters.',
      difficulty: 'Challenging',
      skill: 'Error Minimization',
      icon: Target,
      color: 'var(--color-error)'
    },
    {
      id: 'endless',
      name: 'ENDLESS GROVE',
      desc: 'Non-stop typing with continuously ramping difficulty tiers.',
      difficulty: 'Endurance',
      skill: 'Stamina & Focus',
      icon: InfinityIcon,
      color: 'var(--color-accent-luminous)'
    },
    {
      id: 'spore_fall',
      name: 'SPORE FALL',
      desc: 'Words descend like bioluminescent spores. Type before they hit the ground!',
      difficulty: 'Dynamic',
      skill: 'Reaction Time under Pressure',
      icon: Sparkles,
      color: 'var(--color-accent-luminous)'
    },
    {
      id: 'word_survival',
      name: 'THORN SURVIVAL',
      desc: 'Zero-mistake survival mode. A single typo ends the run.',
      difficulty: 'Expert',
      skill: 'Flawless Precision',
      icon: ShieldAlert,
      color: 'var(--color-error)'
    },
    {
      id: 'precision',
      name: 'PRECISION DIAGNOSTICS',
      desc: 'Diagnostic mode that identifies your weakest mistyped keys.',
      difficulty: 'Diagnostic',
      skill: 'Finger Memory Correction',
      icon: Activity,
      color: 'var(--color-accent-primary)'
    },
    {
      id: 'progressive',
      name: 'PATHFINDER',
      desc: 'Level-based progression from short words to symbols and code.',
      difficulty: 'Level 1-5',
      skill: 'Comprehensive Keyboard Mastery',
      icon: Compass,
      color: 'var(--color-warm-highlight)'
    },
    {
      id: 'keyboard_trainer',
      name: 'KEYBOARD RUNES',
      desc: 'Interactive virtual keyboard drills for home row, top row, and hands.',
      difficulty: 'Training',
      skill: 'Finger Positioning',
      icon: Keyboard,
      color: 'var(--color-accent-luminous)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '1rem 0 3rem' }}>
      {/* Hero Headline Section */}
      <section style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto', paddingTop: '1.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-moss)',
          padding: '0.35rem 1rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          color: 'var(--color-accent-luminous)',
          marginBottom: '1.25rem',
          boxShadow: 'var(--glow-soft)'
        }}>
          <Sparkles size={16} /> BIOLUMINESCENT TYPING GROVE
        </div>

        <h1 className="heading-display text-gradient" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '1.25rem'
        }}>
          TYPE. PRACTICE. MASTER.
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          Enter an ancient dark forest where every keystroke illuminates the path. Master accuracy, WPM, and reflexes through 9 atmospheric typing challenges.
        </p>

        {/* Action Button & Personal Stats Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => onSelectGame('classic')}
            className="btn-forest btn-forest-primary"
            style={{ fontSize: '1.1rem', padding: '0.85rem 2rem' }}
          >
            START TYPING NOW <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onSelectGame('all')}
            className="btn-forest btn-forest-outline"
            style={{ fontSize: '1.1rem', padding: '0.85rem 1.5rem' }}
          >
            EXPLORE GAMES <Gamepad2 size={18} />
          </button>
        </div>

        {/* Quick Personal Best Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '2.5rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PERSONAL BEST WPM</div>
            <div className="font-mono text-luminous" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {stats.bestWpm || 0} WPM
            </div>
          </div>
          <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BEST ACCURACY</div>
            <div className="font-mono text-success" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-success)' }}>
              {stats.bestAccuracy || 100}%
            </div>
          </div>
          <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL SESSIONS</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {stats.totalSessions || 0}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Showcase Grid */}
      <section>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 className="heading-display" style={{ fontSize: '1.5rem' }}>TYPING MODES & GAMES</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select a practice mode to hone specific typing dimensions</p>
          </div>
          <button onClick={() => onSelectGame('all')} className="btn-forest btn-forest-outline">
            View All Games <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {gamesList.map((game) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="forest-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-moss)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: game.color
                    }}>
                      <Icon size={22} />
                    </div>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--bg-deep)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {game.difficulty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {game.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {game.desc}
                  </p>
                </div>

                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-accent-primary)',
                    marginBottom: '0.85rem'
                  }}>
                    Target Skill: <strong>{game.skill}</strong>
                  </div>

                  <button
                    onClick={() => onSelectGame(game.id)}
                    className="btn-forest btn-forest-primary"
                    style={{ width: '100%' }}
                  >
                    PLAY NOW <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Record Board Preview Section */}
      <section className="forest-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={24} style={{ color: 'var(--color-warm-highlight)' }} />
            <h2 className="heading-display" style={{ fontSize: '1.35rem', margin: 0 }}>RECORD GROVE LEADERBOARD</h2>
          </div>
          <button onClick={() => onSelectGame('records')} className="btn-forest btn-forest-outline">
            Full Board <ArrowRight size={16} />
          </button>
        </div>

        {records.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-moss)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>#</th>
                  <th style={{ padding: '0.75rem' }}>PLAYER</th>
                  <th style={{ padding: '0.75rem' }}>WPM</th>
                  <th style={{ padding: '0.75rem' }}>ACCURACY</th>
                  <th style={{ padding: '0.75rem' }}>MODE</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 5).map((rec, idx) => (
                  <tr key={rec._id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--color-accent-luminous)' }}>
                      0{idx + 1}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{rec.playerName}</td>
                    <td className="font-mono text-luminous" style={{ padding: '0.75rem', fontWeight: 700 }}>{rec.wpm}</td>
                    <td className="font-mono" style={{ padding: '0.75rem', color: 'var(--color-success)' }}>{rec.accuracy}%</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{rec.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            No records in Record Grove yet. Be the first to set a high score!
          </div>
        )}
      </section>
    </div>
  );
};
