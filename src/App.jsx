import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import AiChatbot from './components/AiChatbot/AiChatbot';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth >= 1024) {
        document.documentElement.style.setProperty('--x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-text-primary-dark transition-colors duration-300 relative flex flex-col font-sans">
            {/* Global Spotlight Hover Follower (Desktop only) */}
            <div className="fixed inset-0 pointer-events-none z-30 spotlight-bg hidden lg:block" />

            {/* Global Ambient Glow Gradients */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-500/5 dark:from-blue-500/10 to-transparent pointer-events-none z-0" />
            <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            
            <Header />
            
            <main className="flex-grow z-10">
              <AppRoutes />
            </main>
            
            <Footer />
            
            {/* AI Chatbot Assistant */}
            <AiChatbot />
          </div>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

