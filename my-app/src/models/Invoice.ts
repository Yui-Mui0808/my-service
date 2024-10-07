// models/Invoice.ts

export interface InvoiceItem {
    name: string;
    quantity: number;  // amountではなく quantity に統一
    unitPrice: number;
    taxRate: string;   // tax ではなく taxRate に統一
    total: number;
  }

  export interface Invoice {
    companyName: string;
    invoiceNumber: string;
    items: InvoiceItem[];
    totalAmount: number;
    isIssued: boolean;  // 発行済みかどうかを示すプロパティ
  }
