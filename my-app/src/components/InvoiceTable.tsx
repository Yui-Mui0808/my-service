import React from 'react';
import './InvoiceTable.css'; // スタイルをインポート
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
                            <td className="item-name">{item.name}</td>
                            <td className="item-amount">{item.amount.toLocaleString()}円</td> {/* コンマ追加済み */}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>小計</td>
                        <td>{subtotal.toLocaleString()}円</td>
                    </tr>
                    <tr>
                        <td>税金</td>
                        <td>{taxTotal.toLocaleString()}円</td>
                    </tr>
                    <tr>
                        <td>合計</td>
                        <td>{totalAmount.toLocaleString()}円</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default InvoiceTable;
