import React, { useState } from 'react';

const InvoiceForm: React.FC = () => {
  const [customer, setCustomer] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice = {
      customer,
      invoiceNumber,
      invoiceDate,
    };
    // 新しい請求書をサーバーに送信するロジック
    console.log(newInvoice);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>取引先:</label>
      <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      
      <label>請求書番号:</label>
      <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
      
      <label>請求日:</label>
      <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
      
      <button type="submit">請求書を作成</button>
    </form>
  );
}

export default InvoiceForm;
