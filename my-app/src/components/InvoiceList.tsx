// InvoiceList.tsx
import React, { useState } from 'react';
import { Invoice } from '../models/Invoice'; // Invoice型をインポート
import { invoices } from '../data/invoices';
import InvoiceComponent from './Invoice';

const InvoiceList: React.FC = () => {
    const [selectedInvoice, setSelectedInvoice] = useState<string>(invoices[0].invoiceNumber);

    const handleInvoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInvoice(event.target.value);
    };

    const selected: Invoice | undefined = invoices.find(invoice => invoice.invoiceNumber === selectedInvoice);

    return (
        <div className="invoice-list">
            <select onChange={handleInvoiceChange} value={selectedInvoice}>
                {invoices.map(invoice => (
                    <option key={invoice.invoiceNumber} value={invoice.invoiceNumber}>
                        {invoice.companyName} ({invoice.invoiceNumber})
                    </option>
                ))}
            </select>

            {selected && <InvoiceComponent invoice={selected} />}
        </div>
    );
};

export default InvoiceList;
