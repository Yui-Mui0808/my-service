// data/invoices.ts
import { Invoice } from '../models/Invoice';

export const invoices: Invoice[] = [
    {
        companyName: "株式会社 鬼殺隊",
        invoiceNumber: "T1234567890123",
        items: [
            { name: "任務により隊士の移動にかかった交通費", amount: 250000, tax: 25000 },
            { name: "刀の修理費・隊服の修繕費", amount: 3000000, tax: 300000 }
        ],
        totalAmount: 3250000
    },
    {
        companyName: "株式会社 蝶屋敷",
        invoiceNumber: "T9876543210123",
        items: [
            { name: "治療費・薬剤費", amount: 1800000, tax: 180000 }
        ],
        totalAmount: 1980000
    },
    {
        companyName: "株式会社 霞柱邸",
        invoiceNumber: "T1122334455667",
        items: [
            { name: "新人隊士への指導料", amount: 4500000, tax: 450000 }
        ],
        totalAmount: 4950000
    }
];
