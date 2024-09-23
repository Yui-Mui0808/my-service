// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // ルートを定義するためにRouterをインポート
import { InvoiceProvider } from './context/InvoiceContext'; // InvoiceProviderをインポート
import AuthRoutesWrapper from './components/AuthRoutesWrapper'; // 認証状態を監視するコンポーネント
import './styles.css'; // スタイルシートをインポート

const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <Router>
        {/* 認証状態を監視するラップコンポーネント */}
        <AuthRoutesWrapper />
      </Router>
    </InvoiceProvider>
  );
};

export default App;
