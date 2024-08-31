// src/models/InvoiceModel.ts

// この行を削除またはコメントアウト
// import { InvoiceItem } from '../types';

export class InvoiceItemModel {
  constructor(
    public itemName: string,
    public amount: number,
    public tax: number
  ) {}

  getTotal(): number {
    return this.amount + this.tax;
  }
}

export class InvoiceModel {
  public totalAmount: number;

  constructor(
    public companyName: string,
    public registrationNumber: string,
    public items: InvoiceItemModel[]
  ) {
    this.totalAmount = this.calculateTotal();
  }

  private calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }
}
