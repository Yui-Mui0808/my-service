// components/Invoice.tsx

import React from 'react';
import InvoiceItem from './InvoiceItem';
import { InvoiceData } from '../models/InvoiceModel';

type InvoiceProps = {
  data: InvoiceData;
};

const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  const subTotal = data.items.reduce((total, item) => total + item.amount, 0);
  const taxAmount = subTotal * data.taxRate;
  const total = subTotal + taxAmount;

  return (
    <div className="invoice-container">
      <h1 className="invoice-title">請求書</h1>
      <div className="invoice-header">
        <div className="invoice-section-left">
          <h2>請求先:</h2>
          <p>{data.to.companyName}</p>
          <p>登録番号: {data.to.registrationNumber}</p>
        </div>
        <div className="invoice-section-right">
          <h2>請求元:</h2>
          <p>{data.from.companyName}</p>
          <p>登録番号: {data.from.registrationNumber}</p>
        </div>
      </div>
      <div className="invoice-section">
        <h2>請求項目:</h2>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>項目</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <InvoiceItem key={index} item={item} />
            ))}
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>小計: {subTotal.toLocaleString()}円</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>消費税 ({(data.taxRate * 100).toFixed(1)}%): {taxAmount.toLocaleString()}円</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right', fontWeight: 'bold' }}>合計金額: {total.toLocaleString()}円</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
