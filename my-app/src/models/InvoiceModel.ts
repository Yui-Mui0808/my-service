// models/InvoiceModel.ts

export type InvoiceItem = {
  description: string;
  amount: number;
};

export type InvoiceData = {
  from: {
    companyName: string;
    registrationNumber: string;
  };
  to: {
    companyName: string;
    registrationNumber: string;
  };
  items: InvoiceItem[];
  taxRate: number;
};

// サンプルデータを定義
export const sampleInvoiceData: InvoiceData = {
  from: {
    companyName: "株式会社 鬼殺隊",
    registrationNumber: "T1234567890123",
  },
  to: {
    companyName: "株式会社 藤屋敷",
    registrationNumber: "T9876543210123",
  },
  items: [
    { description: "任務による隊士の移動にかかった交通費", amount: 250000 },
    { description: "刀の修理費・隊服の修繕費", amount: 3000000 },
  ],
  taxRate: 0.1,
};
