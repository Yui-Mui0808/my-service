import React from 'react';
import './InvoiceItem.css';  // スタイルのインポート

interface InvoiceItemProps {
    itemName: string;
    amount: number;
    tax: number;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ itemName, amount, tax }) => {
    return (
        <div className="invoice-item">
            <span>{itemName}</span>
            <span>{amount.toLocaleString()}円</span>
            <span>{tax.toLocaleString()}円</span>
        </div>
    );
};

export default InvoiceItem;
