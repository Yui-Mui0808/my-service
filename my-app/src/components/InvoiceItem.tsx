import React from 'react';

type InvoiceItemProps = {
  name: string;
  amount: number;
};

const InvoiceItem: React.FC<InvoiceItemProps> = ({ name, amount }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span>{name}</span>
      <span>{amount.toLocaleString()}円</span>
    </div>
  );
};

export default InvoiceItem;


