// src/components/InvoiceDetails.tsx
import React, { useContext } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import './InvoiceDetails.css';  // CSSファイルのインポート

const InvoiceDetails: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceDetails must be used within an InvoiceProvider');

  const { selectedInvoice } = context;  // selectedInvoiceを取得

  if (!selectedInvoice) {
    return <p>請求書が選択されていません。請求書を選んでください。</p>;
  }

  return (
    <div className="invoice-details-container">
      <h2>請求書詳細</h2>
      <p>会社名: {selectedInvoice.companyName}</p>
      <p>登録番号: {selectedInvoice.registrationNumber}</p>
      <p>請求書番号: {selectedInvoice.invoiceNumber}</p>
      <p>請求日: {selectedInvoice.invoiceDate}</p>
      <p>支払期限: {selectedInvoice.paymentDue}</p>
      <h3>項目リスト</h3>
      <ul className="invoice-item-list">
        {selectedInvoice.items.map((item, index) => (
          <li key={index}>
            {item.itemName} - {item.amount}円（消費税: {item.tax}円） - 合計: {item.getTotal()}円
          </li>
        ))}
      </ul>
      <p className="invoice-total">合計金額: {selectedInvoice.totalAmount}円</p>
    </div>
  );
};

export default InvoiceDetails;
