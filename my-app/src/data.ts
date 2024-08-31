// src/data.ts
import { Invoice, InvoiceItem } from './InvoiceModel';

export const invoices: Invoice[] = [
  new Invoice('株式会社 鬼殺隊', 'T1234567890123', [
    new InvoiceItem('任務により隊士の移動にかかった交通費', 250000, 25000),
    new InvoiceItem('刀の修理費・隊服の修繕費', 3000000, 300000),
  ]),
  new Invoice('株式会社 蝶屋敷', 'T9876543210987', [
    new InvoiceItem('治療費・薬剤費', 1800000, 180000),
  ]),
  new Invoice('株式会社 霞柱邸', 'T1239876543210', [
    new InvoiceItem('新人隊士への指導料', 4500000, 450000),
  ]),
];
