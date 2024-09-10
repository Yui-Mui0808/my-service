// src/components/NewInvoice.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IInvoice } from '../models/InvoiceModel';

const NewInvoice = () => {
  const [invoice, setInvoice] = useState<IInvoice>({
    invoiceNumber: '',
    customer: '',
    invoiceDate: '',
    paymentDue: '',
    totalAmount: 0,
    companyName: '',
    registrationNumber: '',
    items: [],
    calculateTotal: () => 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで送信処理を追加する
    navigate('/');
  };

  return (
    <div>
      <h1>新規請求書作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="invoiceNumber">請求書番号:</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="customer">取引先:</label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={invoice.customer}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="invoiceDate">請求日:</label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="paymentDue">支払期限:</label>
          <input
            type="date"
            id="paymentDue"
            name="paymentDue"
            value={invoice.paymentDue}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default NewInvoice;
