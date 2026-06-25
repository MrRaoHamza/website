import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Terminal } from 'lucide-react';

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
        botResponseText = "Rao is completing his BS in Computer Science (2022 - 2026) with a strong GPA of 3.8/4.0. His coursework highlights include Machine Learning, Artificial Intelligence, and Advanced Algorithms.";
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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 1.5 }}
      >
        <motion.button
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center justify-center relative group cursor-pointer"
          aria-label="Toggle AI Assistant"
        >
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-2 border-blue-500 pointer-events-none"
          />
          <MessageSquare size={24} className="relative z-10" />
        </motion.button>
      </motion.div>


      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] rounded-2xl glass shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-dark-border"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600/90 dark:to-indigo-600/90 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-white/10 rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-blue-100" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm flex items-center">
                    Rao's Assistant
                    <Sparkles size={12} className="ml-1 text-yellow-300 fill-yellow-300" />
                  </h4>
                  <span className="text-[10px] text-blue-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse" />
                    Agent Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-dark-bg/25">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border text-slate-800 dark:text-text-primary-dark rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border text-slate-800 dark:text-text-primary-dark rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 bg-slate-50/20 dark:bg-dark-bg/10 flex flex-wrap gap-1.5">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="text-[10px] font-medium px-2 py-1 rounded-full border border-slate-200 dark:border-dark-border text-slate-600 hover:text-blue-600 hover:border-blue-600/30 dark:text-text-secondary-dark dark:hover:text-white dark:hover:border-white/30 bg-white/50 dark:bg-dark-card/50 cursor-pointer transition-all"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="p-3 border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about skills, projects, contact..."
                className="flex-grow bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-text-primary-dark focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiChatbot;
