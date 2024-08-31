// src/types.ts
export interface InvoiceItem {
    itemName: string;
    amount: number;
    tax: number;
  }
  
  export interface Invoice {
    companyName: string;
    registrationNumber: string;
    items: InvoiceItem[];
    totalAmount: number;
  }
  