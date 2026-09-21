import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import AiChatbot from './components/AiChatbot/AiChatbot';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--c-bg)' }}>
            <Header />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <AiChatbot />
          </div>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
