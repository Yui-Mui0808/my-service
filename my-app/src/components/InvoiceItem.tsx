// components/InvoiceItem.tsx

import React from 'react';
import { InvoiceItem as InvoiceItemType } from '../models/InvoiceModel';

type InvoiceItemProps = {
  item: InvoiceItemType;
};

const InvoiceItem: React.FC<InvoiceItemProps> = ({ item }) => {
  return (
    <tr>
      <td style={{ textAlign: 'left' }}>{item.description}</td>
      <td>{item.amount.toLocaleString()}円</td>
    </tr>
  );
};

export default InvoiceItem;
