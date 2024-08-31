import React, { useContext } from 'react';
import { InvoiceContext } from '../InvoiceContext';
import './InvoiceList.css';  // CSSファイルをインポート

const InvoiceList: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceList must be used within an InvoiceProvider');

  const { invoices, selectInvoice } = context;

  return (
    <div>
      <h2 className="invoice-list-title">請求書リスト</h2>
      <ul className="invoice-list">
        {invoices.map((invoice, index) => (
          <li 
            key={index} 
            className="invoice-list-item"
            onClick={() => selectInvoice(index)}
          >
            {invoice.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
