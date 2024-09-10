import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import NewInvoice from './components/NewInvoice';  // 新しいコンポーネントをインポート

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/new-invoice" element={<NewInvoice />} />  {/* 新しい請求書作成ページ */}
      </Routes>
    </Router>
  );
};

export default App;
