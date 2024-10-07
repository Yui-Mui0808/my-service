// src/models/InvoiceModel.ts

// InvoiceItem 型の定義
export type InvoiceItem = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: string;
  total: number;
};

// Invoice クラスの定義
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
    public isIssued: boolean = false // 発行済みかどうかのステータス
  ) {}

  // calculateTotal メソッドをクラス内に定義
  public calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
}

