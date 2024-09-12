import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import NewInvoice from './components/NewInvoice';  // 新しいコンポーネントをインポート
import EditInvoice from './components/EditInvoice'; // ← 新しい編集ページをインポート

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 請求書リストページ */}
        <Route path="/" element={<InvoiceList />} />
        {/* 新規請求書作成ページ */}
        <Route path="/new-invoice" element={<NewInvoice />} />
        <Route path="/edit-invoice/:id" element={<EditInvoice />} /> {/* ← 編集ページのルート */}
      </Routes>
    </Router>
  );
};

export default App;
