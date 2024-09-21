// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import NewInvoice from './components/NewInvoice';
import EditInvoice from './components/EditInvoice';
import InvoiceDetails from './components/InvoiceDetails';
import { InvoiceProvider } from './context/InvoiceContext'; // InvoiceProviderをインポート
import './styles.css';

const App: React.FC = () => {
  return (
    <InvoiceProvider>  {/* アプリ全体をProviderでラップ */}
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/edit-invoice/:id" element={<EditInvoice />} />
          <Route path="/invoice-details/:invoiceNumber" element={<InvoiceDetails />} />
        </Routes>
      </Router>
    </InvoiceProvider>
  );
};

export default App;

