// src/components/InvoiceDetails.tsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';
import './InvoiceDetails.css';  // CSSファイルのインポート
import './InvoiceDetails.css';

const InvoiceDetails: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceDetails must be used within an InvoiceProvider');
  const { invoiceNumber } = useParams<{ invoiceNumber: string }>();
  const { invoices } = useContext(InvoiceContext) || { invoices: [] };

  const { selectedInvoice } = context;  // selectedInvoiceを取得
// 該当する請求書を探す  
  const selectedInvoice = invoices.find((invoice) => invoice.invoiceNumber === invoiceNumber);

  if (!selectedInvoice) {
    return <p>請求書が選択されていません。請求書を選んでください。</p>;
    return <p>該当する請求書が見つかりません。</p>;
  }

  return (
    <div className="invoice-details-container">
      <h2>請求書詳細</h2>
      <p>会社名: {selectedInvoice.companyName}</p>
      <p>登録番号: {selectedInvoice.registrationNumber}</p>
      <p>請求書番号: {selectedInvoice.invoiceNumber}</p>
      <p>請求日: {selectedInvoice.invoiceDate}</p>
      <p>支払期限: {selectedInvoice.paymentDue}</p>
      <h2>請求書詳細ページ</h2>
      <div className="invoice-details">
        <p>請求書番号: {selectedInvoice.invoiceNumber}</p>
        <p>会社名: {selectedInvoice.companyName}</p>
        <p>請求日: {selectedInvoice.invoiceDate}</p>
        <p>支払期限: {selectedInvoice.paymentDue}</p>
      </div>
      <h3>項目リスト</h3>
      <ul className="invoice-item-list">
        {selectedInvoice.items.map((item, index) => (
          <li key={index}>
            {item.itemName} - {item.amount}円（消費税: {item.tax}円） - 合計: {item.getTotal()}円
            {item.itemName}: {item.amount.toLocaleString()}円 (税: {item.tax.toLocaleString()}円)
          </li>
        ))}
      </ul>
      <p className="invoice-total">合計金額: {selectedInvoice.totalAmount}円</p>
      <p className="invoice-total">合計金額: {selectedInvoice.totalAmount.toLocaleString()}円</p>
    </div>
  );
};

export default InvoiceDetails;