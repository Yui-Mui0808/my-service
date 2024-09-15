// src/models/InvoiceModel.ts

// 請求書項目のクラス
export class InvoiceItem {
  constructor(
    public name: string,          // 商品名
    public quantity: number,      // 数量
    public unit: string,          // 単位
    public unitPrice: number,     // 単価
    public taxRate: string,       // 税率
    public total: number          // 合計金額
  ) {}
}

// 請求書のクラス
export class Invoice {
  constructor(
    public invoiceNumber: string,        // 請求書番号
    public invoiceDate: string,          // 請求日
    public paymentDue: string,           // 支払期限
    public companyName: string,          // 会社名
    public customer: string,             // 顧客名
    public items: InvoiceItem[],         // 明細項目（InvoiceItemの配列）
    public totalAmount: number,          // 総合計金額
    public registrationNumber: string    // 登録番号
  ) {}

  // calculateTotal メソッドを修正
  calculateTotal(): number {
    // 明細項目の単価 × 数量を合計する
    return this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }
}
