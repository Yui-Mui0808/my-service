// src/InvoiceDetails.tsx
import React, { useContext } from 'react';
import './InvoiceDetails.css';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceDetails: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceDetails must be used within an InvoiceProvider');

  const { selectedInvoice } = context;

  if (!selectedInvoice) return <p>請求書が選択されていません。請求書を選んでください。</p>;

  return (
    <div>
      <h2>請求書詳細</h2>
      <p>会社名: {selectedInvoice.companyName}</p>
      <p>登録番号: {selectedInvoice.registrationNumber}</p>
      <h3>項目リスト</h3>
      <ul>
        {selectedInvoice.items.map((item, index) => (
          <li key={index}>
            {item.itemName} - {item.amount}円 (消費税: {item.tax}円) - 合計: {item.getTotal()}円
          </li>
        ))}
      </ul>
      <p>合計金額: {selectedInvoice.totalAmount}円</p>
    </div>
  );
};

export default InvoiceDetails;
