import React from 'react';
import './InvoiceItem.css';

type InvoiceItemProps = {
  name: string;
  amount: number;
};

const InvoiceItem: React.FC<InvoiceItemProps> = ({ name, amount }) => {
  return (
    <div className="invoice-item">
      <span>{name}</span>
      <span>{amount.toLocaleString()}円</span>
    </div>
  );
};

export default InvoiceItem;
