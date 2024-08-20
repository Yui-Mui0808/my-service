export type InvoiceItem = {
  name: string;
  amount: number;
};

export type Invoice = {
  issuerCompanyName: string;        // 請求元の会社名
  issuerRegistrationNumber: string; // 請求元の登録番号
  recipientCompanyName: string;     // 請求先の会社名
  recipientRegistrationNumber: string; // 請求先の登録番号
  invoiceItems: InvoiceItem[];      // 請求項目のリスト
  taxRate: number;  // 消費税率 (例: 0.10 は 10%)
};

export const dummyInvoice: Invoice = {
  issuerCompanyName: '株式会社 鬼殺隊',
  issuerRegistrationNumber: 'T1234567890123',
  recipientCompanyName: '株式会社 藤屋敷',
  recipientRegistrationNumber: 'T9876543210123',
  invoiceItems: [
    { name: '任務により隊士の移動にかかった交通費', amount: 250000 },
    { name: '刀の修理費・隊服の修繕費', amount: 3000000 },
  ],
  taxRate: 0.10,  // 10% の消費税
};


