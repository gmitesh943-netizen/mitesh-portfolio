import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';

const ACCENT = '#3b82f6';
const GREEN = '#10b981';
const RED = '#ef4444';
const YELLOW = '#f59e0b';

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '24px',
  backdropFilter: 'blur(10px)',
};

export default function Admin() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user) fetchMessages();
  }, [user]);

  const fetchMessages = async () => {
    setDataLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setDataLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError('Invalid email or password. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteDoc(doc(db, 'contacts', id));
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markRead = async (id) => {
    await updateDoc(doc(db, 'contacts', id), { status: 'read' });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: 'read' }));
  };

  const filtered = messages.filter(m => {
    const matchSearch = m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || m.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status !== 'read').length,
    today: messages.filter(m => {
      const d = m.timestamp?.toDate?.();
      if (!d) return false;
      const today = new Date();
      return d.toDateString() === today.toDateString();
    }).length,
  };

  // ─── Auth Loading ───
  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div style={{ color: '#64748b', fontSize: '1rem' }}>Loading...</div>
      </div>
    );
  }

  // ─── Login Screen ───
  if (!user) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ width: '100%', maxWidth: '420px', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(59,130,246,0.4)',
            }}>🔐</div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f1f5f9', margin: 0 }}>Admin Panel</h1>
            <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.9rem' }}>Mitesh's Portfolio Dashboard</p>
          </div>

          <form onSubmit={handleLogin} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@email.com"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', fontSize: '0.95rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', fontSize: '0.95rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            {loginError && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#fca5a5', fontSize: '0.85rem' }}>
                {loginError}
              </div>
            )}
            <button
              type="submit" disabled={loginLoading}
              style={{
                padding: '13px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: '#fff', fontWeight: 700, fontSize: '1rem',
                opacity: loginLoading ? 0.7 : 1, transition: 'all 0.2s',
              }}
            >
              {loginLoading ? '⏳ Logging in...' : '🚀 Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', sans-serif", color: '#e2e8f0' }}>

      {/* Top Nav */}
      <div style={{
        padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
          }}>📊</div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>Admin Dashboard</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Mitesh Portfolio</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={fetchMessages} style={{
            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem',
          }}>🔄 Refresh</button>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            {user.email}
          </div>
          <button onClick={() => signOut(auth)} style={{
            padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.1)', color: '#fca5a5', cursor: 'pointer', fontSize: '0.85rem',
          }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Total Messages', value: stats.total, icon: '📬', color: ACCENT },
            { label: 'Unread', value: stats.unread, icon: '🔔', color: YELLOW },
            { label: 'Today', value: stats.today, icon: '📅', color: GREEN },
          ].map(s => (
            <div key={s.label} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                background: `${s.color}18`, border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '24px' }}>

          {/* Messages List */}
          <div style={cardStyle}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search messages..."
                style={{
                  flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                  color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
                }}
              />
              {['all', 'new', 'read'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '8px 16px', borderRadius: '8px', border: `1px solid ${filter === f ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                  background: filter === f ? `${ACCENT}20` : 'transparent',
                  color: filter === f ? ACCENT : '#64748b', cursor: 'pointer', fontSize: '0.85rem',
                  textTransform: 'capitalize',
                }}>{f}</button>
              ))}
            </div>

            {/* Table */}
            {dataLoading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading messages...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
                <div>No messages found</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr>
                      {['Status', 'Name', 'Email', 'Subject', 'Date', 'Actions'].map(h => (
                        <th key={h} style={{
                          padding: '10px 12px', textAlign: 'left', fontSize: '10px',
                          color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(m => (
                      <tr
                        key={m.id}
                        onClick={() => setSelected(m)}
                        style={{
                          cursor: 'pointer',
                          background: selected?.id === m.id ? 'rgba(59,130,246,0.08)' : 'transparent',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (selected?.id !== m.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                        onMouseLeave={e => { if (selected?.id !== m.id) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                            background: m.status === 'read' ? 'rgba(100,116,139,0.2)' : 'rgba(245,158,11,0.2)',
                            color: m.status === 'read' ? '#64748b' : YELLOW,
                          }}>{m.status === 'read' ? 'Read' : 'New'}</span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: m.status !== 'read' ? 700 : 400, color: '#f1f5f9' }}>{m.name}</td>
                        <td style={{ padding: '12px', color: '#94a3b8' }}>{m.email}</td>
                        <td style={{ padding: '12px', color: '#94a3b8', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subject || '—'}</td>
                        <td style={{ padding: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                          {m.timestamp?.toDate?.()?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) || '—'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                            {m.status !== 'read' && (
                              <button onClick={() => markRead(m.id)} title="Mark as Read" style={{
                                padding: '5px 10px', borderRadius: '6px', border: `1px solid ${GREEN}40`,
                                background: `${GREEN}15`, color: GREEN, cursor: 'pointer', fontSize: '12px',
                              }}>✓ Read</button>
                            )}
                            <button onClick={() => handleDelete(m.id)} title="Delete" style={{
                              padding: '5px 10px', borderRadius: '6px', border: `1px solid ${RED}40`,
                              background: `${RED}15`, color: RED, cursor: 'pointer', fontSize: '12px',
                            }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Message Detail Panel */}
          {selected && (
            <div style={{ ...cardStyle, position: 'sticky', top: '80px', alignSelf: 'start', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', margin: 0 }}>Message Detail</h3>
                <button onClick={() => setSelected(null)} style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8',
                  width: '30px', height: '30px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
                }}>×</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'From', value: selected.name },
                  { label: 'Email', value: selected.email },
                  { label: 'Subject', value: selected.subject || '—' },
                  { label: 'Date', value: selected.timestamp?.toDate?.()?.toLocaleString('en-IN') || '—' },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{f.label}</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{f.value}</div>
                  </div>
                ))}

                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Message</div>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px',
                    color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.9rem', whiteSpace: 'pre-wrap',
                  }}>{selected.message}</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <a href={`mailto:${selected.email}`} style={{
                    flex: 1, padding: '10px', borderRadius: '10px', textAlign: 'center',
                    background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`,
                    color: ACCENT, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
                  }}>✉️ Reply</a>
                  {selected.status !== 'read' && (
                    <button onClick={() => markRead(selected.id)} style={{
                      flex: 1, padding: '10px', borderRadius: '10px',
                      background: `${GREEN}20`, border: `1px solid ${GREEN}40`,
                      color: GREEN, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    }}>✓ Mark Read</button>
                  )}
                  <button onClick={() => handleDelete(selected.id)} style={{
                    padding: '10px 16px', borderRadius: '10px',
                    background: `${RED}15`, border: `1px solid ${RED}40`,
                    color: RED, cursor: 'pointer', fontSize: '0.85rem',
                  }}>🗑</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
