import React from 'react';
import { InvoiceProvider } from './InvoiceContext';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import './App.css';  // CSSファイルをインポート

const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <div className="app-container">
        <h1 className="app-title">請求書表示サービス</h1>
        <div className="invoice-content">
          <InvoiceList />
          <InvoiceDetails />
        </div>
      </div>
    </InvoiceProvider>
  );
};

export default App;


