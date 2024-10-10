// src/models/InvoiceModel.ts

// InvoiceItemの定義をtypeに統一
export type InvoiceItem = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: string;
  total: number;
};

// 請求書のクラス
export class Invoice {
  constructor(
    public invoiceNumber: string,
    public invoiceDate: string,
    public paymentDue: string,
    public companyName: string,
    public customer: string,
    public items: InvoiceItem[],   // items は InvoiceItem 型の配列
    public totalAmount: number,
    public registrationNumber: string, 
    public isIssued: boolean = false  // 発行済みかどうかのステータスを追加
  ) {}

}