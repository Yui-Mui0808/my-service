// components/InvoiceTable.tsx
import React from 'react';
import { InvoiceItem } from '../models/Invoice';

interface InvoiceTableProps {
    items: InvoiceItem[];
    subtotal: number;
    taxTotal: number;
    totalAmount: number;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ items, subtotal, taxTotal, totalAmount }) => {
    return (
        <div>
            <h3>請求項目:</h3>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>項目</th>
                        <th>金額</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="item-name">{item.name}</td>   {/* 項目名セル */}
                            <td className="item-amount">{item.amount.toLocaleString()}円</td> {/* 金額セル */}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="item-name">小計:</td>
                        <td className="item-amount">{subtotal.toLocaleString()}円</td>
                    </tr>
                    <tr>
                        <td className="item-name">消費税 (10.0%):</td>
                        <td className="item-amount">{taxTotal.toLocaleString()}円</td>
                    </tr>
                    <tr>
                        <td className="item-name">合計金額:</td>
                        <td className="item-amount">{totalAmount.toLocaleString()}円</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default InvoiceTable;

