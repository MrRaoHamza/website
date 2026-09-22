import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm Rao's AI Assistant. Ask me anything about his skills, projects, education, or availability!",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    "What are your core ML skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "Where did you study?"
  ];

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Trigger typing state
    setIsTyping(true);

    // Simulate delay
    setTimeout(() => {
      let botResponseText = "";
      const query = text.toLowerCase();

      if (query.includes('skill') || query.includes('python') || query.includes('framework') || query.includes('language') || query.includes('tech')) {
        botResponseText = "Rao has deep competence in Python, SQL, JavaScript, and C++. His Data Science and Machine Learning toolkit includes Pandas, NumPy, Scikit-learn, XGBoost, TensorFlow, Keras, and PyTorch.";
      } else if (query.includes('project') || query.includes('cnn') || query.includes('churn') || query.includes('performance') || query.includes('recommend')) {
        botResponseText = "Rao has built 6 major projects. Notable ones are: Student Performance Prediction (Scikit-learn), Customer Churn Prediction (XGBoost), and CNN Image Classification (TensorFlow). Tap on any card in the Projects gallery to read a full case study!";
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
        botResponseText = "You can contact Rao via email at mr.raohamza@gmail.com, or submit the Contact Form at the bottom of the page. You can also connect via LinkedIn in the footer!";
      } else if (query.includes('study') || query.includes('education') || query.includes('degree') || query.includes('university') || query.includes('gpa')) {
        botResponseText = "Rao completed his BS in Computer Science from Air University (2022–2026) and is now pursuing an MS in Artificial Intelligence at Air University (2026–2028). His focus areas are Machine Learning, Deep Learning, and AI Systems.";
      } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
        botResponseText = "Rao's resume can be downloaded by clicking the 'Resume' button at the top-right of the header. He is open to remote or local AI/ML Engineer and Data Scientist positions!";
      } else {
        botResponseText = "I see! Rao is highly passionate about integrating data engineering with deep learning to build products. Is there a specific project or skill set you'd like to learn more about?";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50, fontFamily: 'var(--font-sans)' }}>

      {/* ── Toggle button — notebook ink style ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Assistant"
        style={{
          width: 46, height: 46,
          borderRadius: '50%',
          background: 'var(--c-ink)',
          color: 'var(--c-bg)',
          border: '2px solid var(--c-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '3px 3px 0 var(--c-rust)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--c-rust)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0 var(--c-rust)'; }}
      >
        {isOpen
          ? <X size={18} />
          : <MessageSquare size={18} />
        }
      </button>


      {/* ── Chat window ── */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: 58, right: 0,
          width: 'min(380px, calc(100vw - 32px))',
          height: 480,
          display: 'flex', flexDirection: 'column',
          borderRadius: 4,
          border: '1px solid var(--c-border)',
          background: 'var(--c-card)',
          boxShadow: '4px 4px 0 var(--c-rust), 0 8px 32px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}>

          {/* Header strip */}
          <div style={{
            background: 'var(--c-rust)', padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bot size={16} style={{ color: '#fff' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>
                  Rao's Assistant
                </p>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-hand)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0, display: 'inline-block' }} />
                  online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}
              style={{ color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          {/* Spiral holes decoration */}
          <div style={{ background: 'var(--c-bg-aged)', padding: '5px 16px', display: 'flex', gap: 14, borderBottom: '1px solid var(--c-border)', flexShrink: 0 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid var(--c-border)', background: 'var(--c-bg)', flexShrink: 0 }} />
            ))}
          </div>

          {/* Messages */}
          <div className="ruled" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--c-card)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '8px 12px',
                  borderRadius: msg.sender === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                  background: msg.sender === 'user' ? 'var(--c-ink)' : 'var(--c-bg)',
                  color: msg.sender === 'user' ? 'var(--c-bg)' : 'var(--c-mid)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--c-border)',
                  fontFamily: 'var(--font-sans)', fontSize: '0.8rem', lineHeight: 1.65,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '8px 14px', borderRadius: '10px 10px 10px 2px', background: 'var(--c-bg)', border: '1px solid var(--c-border)', display: 'flex', gap: 5, alignItems: 'center' }}>
                  {[0, 150, 300].map(d => (
                    <span key={d} className="animate-bounce" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-faint)', display: 'inline-block', animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length === 1 && !isTyping && (
            <div style={{ padding: '8px 12px', borderTop: '1px dashed var(--c-border)', display: 'flex', flexWrap: 'wrap', gap: 6, background: 'var(--c-bg-warm)', flexShrink: 0 }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)}
                  className="chip" style={{ fontSize: '0.72rem', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); handleSend(inputVal); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderTop: '1px solid var(--c-border)', background: 'var(--c-card)', flexShrink: 0 }}>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask about skills, projects…"
              style={{
                flex: 1, background: 'var(--c-bg)', border: '1px solid var(--c-border)',
                borderRadius: 3, padding: '7px 12px',
                fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--c-ink)',
                outline: 'none', transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--c-rust)'}
              onBlur={e => e.target.style.borderColor = 'var(--c-border)'}
            />
            <button type="submit"
              style={{
                width: 34, height: 34, borderRadius: 3, flexShrink: 0,
                background: 'var(--c-ink)', color: 'var(--c-bg)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <Send size={13} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiChatbot;
