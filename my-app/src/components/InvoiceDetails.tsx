import React, { useContext } from 'react';
import { InvoiceContext } from '../InvoiceContext';
import { InvoiceItem } from '../types';
import './InvoiceDetails.css';  // CSSファイルをインポート

const InvoiceDetails: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceDetails must be used within an InvoiceProvider');

  const { selectedInvoice } = context;

  if (!selectedInvoice) return <p>請求書が選択されていません。</p>;

  return (
    <div>
      <h2 className="invoice-details-title">請求書詳細</h2>
      <p>会社名: {selectedInvoice.companyName}</p>
      <p>登録番号: {selectedInvoice.registrationNumber}</p>
      <h3>項目リスト</h3>
      <ul className="invoice-items">
        {selectedInvoice.items.map((item: InvoiceItem, index: number) => (
          <li key={index} className="invoice-item">
            {item.itemName} - {item.amount.toLocaleString()}円 (消費税: {item.tax.toLocaleString()}円) - 合計: {(item.amount + item.tax).toLocaleString()}円
          </li>
        ))}
      </ul>
      <p>合計金額: {selectedInvoice.totalAmount.toLocaleString()}円</p>
    </div>
  );
};

export default InvoiceDetails;
