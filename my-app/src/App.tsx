// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  // Routes は不要
import { InvoiceProvider } from './context/InvoiceContext';
import AuthRoutesWrapper from './components/AuthRoutesWrapper';
import './styles.css';

const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <Router>
        {/* 認証状態を監視するラップコンポーネント */}
        <AuthRoutesWrapper />  {/* children を渡さずにそのまま使用 */}
      </Router>
    </InvoiceProvider>
  );
};

export default App;


