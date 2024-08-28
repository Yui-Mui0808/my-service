// components/InvoiceHeader.tsx
import React from 'react';

interface InvoiceHeaderProps {
    companyName: string;
    invoiceNumber: string;
    senderName: string;
    senderNumber: string;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ companyName, invoiceNumber, senderName, senderNumber }) => {
    return (
        <div className="invoice-section">
            <div>
                <h3>請求先:</h3>
                <p>{companyName}</p>
                <p>登録番号: {invoiceNumber}</p>
            </div>
            <div>
                <h3>請求元:</h3>
                <p>{senderName}</p>
                <p>登録番号: {senderNumber}</p>
            </div>
        </div>
    );
};

export default InvoiceHeader;
