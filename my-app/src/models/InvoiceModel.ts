// src/models/InvoiceModel.ts

// src/models/InvoiceModel.ts

// 請求書項目のクラス
export class InvoiceItem {
  constructor(
    public itemName: string,
    public amount: number,
    public tax: number
  ) {}

  // 消費税を含めた合計金額を計算
  getTotal(): number {
    return this.amount + this.tax;
  }
}

// 請求書のクラス
export class Invoice {
  public totalAmount: number;

  constructor(
    public companyName: string,        // 自社名
    public registrationNumber: string, // 登録番号
    public invoiceNumber: string,      // 請求書番号
    public invoiceDate: string,        // 請求日
    public paymentDue: string,         // 支払期限
    public customer: string,           // 取引先
    public items: InvoiceItem[]        // 請求書項目
  ) {
    this.totalAmount = this.calculateTotal();  // 合計金額を計算
  }

  // 全ての項目の合計金額を計算
  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }
}

// インターフェース定義
export interface IInvoice {
  invoiceNumber: string;
  customer: string;
  invoiceDate: string;
  paymentDue: string;
  totalAmount: number;
  companyName: string;
  registrationNumber: string;
  items: InvoiceItem[];  // 型はInvoiceItemクラスを使用
  calculateTotal(): number;
}

