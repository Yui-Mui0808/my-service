// src/InvoiceModel.ts
export class InvoiceItem {
    constructor(
      public itemName: string,
      public amount: number,
      public tax: number
    ) {}
  
    // この関数で消費税を含めた合計金額を計算します
    getTotal(): number {
      return this.amount + this.tax;
    }
  }
  
  export class Invoice {
    public totalAmount: number;
  
    constructor(
      public companyName: string,
      public registrationNumber: string,
      public items: InvoiceItem[]
    ) {
      this.totalAmount = this.calculateTotal();
    }
  
    // この関数で全ての項目の合計金額を計算します
    private calculateTotal(): number {
      return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }
  }
  