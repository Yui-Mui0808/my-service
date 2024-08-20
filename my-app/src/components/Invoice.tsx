import React from 'react';
import InvoiceItem from './InvoiceItem';
import type { Invoice as InvoiceType } from '../models/InvoiceModel';

type InvoiceProps = {
  invoice: InvoiceType;
};

const Invoice: React.FC<InvoiceProps> = ({ invoice }) => {
  const subtotal = invoice.invoiceItems.reduce((total, item) => total + item.amount, 0);
  const taxAmount = subtotal * invoice.taxRate;
  const totalAmount = subtotal + taxAmount;

  return (
    <div style={{ width: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>請求書</h1>
      <div style={{ marginBottom: '16px' }}>
        <strong>請求元:</strong> {invoice.issuerCompanyName} <br />
        <strong>登録番号:</strong> {invoice.issuerRegistrationNumber}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>請求先:</strong> {invoice.recipientCompanyName} <br />
        <strong>登録番号:</strong> {invoice.recipientRegistrationNumber}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>請求項目:</strong>
        {invoice.invoiceItems.map((item, index) => (
          <InvoiceItem key={index} name={item.name} amount={item.amount} />
        ))}
      </div>
      <div style={{ marginTop: '16px', textAlign: 'right' }}>
        <div>小計: {subtotal.toLocaleString()}円</div>
        <div>消費税 ({(invoice.taxRate * 100).toFixed(1)}%): {taxAmount.toLocaleString()}円</div>
        <strong>合計金額:</strong> {totalAmount.toLocaleString()}円
      </div>
    </div>
  );
};

export default Invoice;





