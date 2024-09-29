// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { InvoiceProvider } from './context/InvoiceContext';
import AuthRoutesWrapper from './components/AuthRoutesWrapper';
import './styles.css';  // スタイルシートをインポート

const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <Router>
        <AuthRoutesWrapper>
          {/* 認証状態を監視するラップコンポーネント */}
          <Routes>
            {/* 他のルートもここに追加できます */}
          </Routes>
        </AuthRoutesWrapper>
      </Router>
    </InvoiceProvider>
  );
};

export default App;

