import { Invoice, InvoiceItem } from './models/InvoiceModel';

export const invoices: Invoice[] = [
  new Invoice(
    '株式会社　鬼殺隊',           // companyName
    'T1234567890123',          // registrationNumber
    'INV-001',                 // invoiceNumber (新しい引数)
    '2024-01-01',              // invoiceDate (新しい引数)
    '2024-01-31',              // paymentDue (新しい引数)
    '株式会社　産屋敷商事',             // customer (新しい引数)
    [
      new InvoiceItem('任務により隊士の移動にかかった交通費', 250000, 25000),
      new InvoiceItem('刀の修理費・隊服の修繕費', 300000, 30000),
    ]
    
  ),
  new Invoice(
    '株式会社　蝶屋敷',           // companyName
    'T9876543210987',          // registrationNumber
    'INV-002',                 // invoiceNumber (新しい引数)
    '2024-02-01',              // invoiceDate (新しい引数)
    '2024-02-28',              // paymentDue (新しい引数)
    '株式会社　産屋敷商事',            // customer (新しい引数)
    [ new InvoiceItem('治療費・薬剤費', 1800000, 180000) ]
  ),
  new Invoice(
    '株式会社　霞柱邸',           // companyName
    'T1239876543210',          // registrationNumber
    'INV-003',                 // invoiceNumber (新しい引数)
    '2024-03-01',              // invoiceDate (新しい引数)
    '2024-03-31',              // paymentDue (新しい引数)
    '新人隊士への指導料',       // customer (新しい引数)
    [ new InvoiceItem('指導費', 450000, 45000) ]
  ),
];