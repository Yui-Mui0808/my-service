import { Invoice } from './models/InvoiceModel';  // 使わない場合は InvoiceItem を削除

export const invoices: Invoice[] = [
  new Invoice(
    'INV-001',                    // invoiceNumber
    '2024-01-01',                 // invoiceDate
    '2024-01-31',                 // paymentDue
    '株式会社　鬼殺隊',           // companyName
    '株式会社　産屋敷商事',       // customer
    [
      { name: '任務により隊士の移動にかかった交通費', quantity: 1, unit: '件', unitPrice: 250000, taxRate: '10%', total: 0 },
      { name: '刀の修理費・隊服の修繕費', quantity: 1, unit: '件', unitPrice: 300000, taxRate: '10%', total: 0 }
    ],
    550000,                       // totalAmount
    'T1234567890123'              // registrationNumber
  ),
  new Invoice(
    'INV-002',
    '2024-02-01',
    '2024-02-28',
    '株式会社　蝶屋敷',
    '株式会社　産屋敷商事',
    [
      { name: '治療費・薬剤費', quantity: 1, unit: '件', unitPrice: 1800000, taxRate: '10%', total: 0 }
    ],
    1800000,
    'T9876543210987'
  ),
  new Invoice(
    'INV-003',
    '2024-03-01',
    '2024-03-31',
    '株式会社　霞柱邸',
    '新人隊士への指導料',
    [
      { name: '指導費', quantity: 1, unit: '件', unitPrice: 450000, taxRate: '10%', total: 0 }
    ],
    450000,
    'T1239876543210'
  ),
];
