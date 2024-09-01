import React from 'react';
import { useContext } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import './InvoiceList.css'; // CSSをインポート

const InvoiceList: React.FC = () => {
    const context = useContext(InvoiceContext);
    if (!context) throw new Error('InvoiceList must be used within an InvoiceProvider');

    const { invoices, selectInvoice } = context;

    return (
        <div>
            <h2>請求書リスト</h2>
            <ul className="invoice-list"> {/* クラスを追加 */}
                {invoices.map((invoice, index) => (
                    <li key={index} onClick={() => selectInvoice(index)} tabIndex={0}>
                        {invoice.companyName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
