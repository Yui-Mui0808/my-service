// components/Invoice.tsx
import React from 'react';
import './Invoice.css';
import { Invoice } from '../models/Invoice';
import InvoiceHeader from './InvoiceHeader';
import InvoiceTable from './InvoiceTable';

interface InvoiceProps {
    invoice: Invoice;
}

const InvoiceComponent: React.FC<InvoiceProps> = ({ invoice }) => {
    const subtotal = invoice.items.reduce((total, item) => total + item.amount, 0);
    const taxTotal = invoice.items.reduce((total, item) => total + item.tax, 0);

    return (
        <div className="invoice">
            <div className="invoice-header">
                <h1>請求書</h1>
            </div>

            <InvoiceHeader
                companyName={invoice.companyName}
                invoiceNumber={invoice.invoiceNumber}
                senderName="株式会社 鬼殺隊"
                senderNumber="T1234567890123"
            />

            <InvoiceTable
                items={invoice.items}
                subtotal={subtotal}
                taxTotal={taxTotal}
                totalAmount={invoice.totalAmount}
            />
        </div>
    );
};

export default InvoiceComponent;
