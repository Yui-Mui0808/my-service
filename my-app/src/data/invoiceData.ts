// src/data/invoiceData.ts
import { InvoiceModel, InvoiceItemModel } from '../models/InvoiceModel';

export const invoices: InvoiceModel[] = [
  new InvoiceModel('株式会社 鬼殺隊', 'T1234567890123', [
    new InvoiceItemModel('任務により隊士の移動にかかった交通費', 250000, 25000),
    new InvoiceItemModel('刀の修理費・隊服の修繕費', 3000000, 300000),
  ]),
  new InvoiceModel('株式会社 蝶屋敷', 'T9876543210987', [
    new InvoiceItemModel('治療費・薬剤費', 1800000, 180000),
  ]),
  new InvoiceModel('株式会社 霞柱邸', 'T1239876543210', [
    new InvoiceItemModel('新人隊士への指導料', 4500000, 450000),
  ]),
];
