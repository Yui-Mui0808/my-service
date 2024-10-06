// models/Invoice.ts
export interface InvoiceItem {
    name: string;
    amount: number;
    tax: number;
}

export interface Invoice {
    companyName: string;
    invoiceNumber: string;
    items: InvoiceItem[];
    totalAmount: number;
    isIssued: boolean;  // 発行済みかどうかを示すプロパティを追加
}
