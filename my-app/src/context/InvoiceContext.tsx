// src/context/InvoiceContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Invoice, InvoiceItem } from '../models/InvoiceModel';

interface InvoiceProviderProps {
  children: ReactNode;
}

interface InvoiceContextProps {
  invoices: Invoice[];  // 請求書のリスト
  selectInvoice: (index: number) => void;
  selectedInvoice: Invoice | null;  // 選択された請求書
  deleteInvoice: (index: number) => void;
}

export const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    new Invoice(
      '株式会社ABC', 'T1234567890123', 'INV-001', '2024-01-01', '2024-01-31',
      '株式会社ABC', [
        new InvoiceItem('商品A', 250000, 25000),  // 商品Aのデータ
        new InvoiceItem('商品B', 300000, 30000)   // 商品Bのデータ
      ]
    ),
    new Invoice(
      'XYZ商事', 'T9876543210987', 'INV-002', '2024-02-01', '2024-02-28',
      'XYZ商事', [
        new InvoiceItem('商品C', 180000, 18000)   // 商品Cのデータ
      ]
    ),
    new Invoice(
      '株式会社飛田', 'T1239876543210', 'INV-003', '2024-03-01', '2024-03-31',
      '株式会社飛田', [
        new InvoiceItem('商品D', 450000, 45000)   // 商品Dのデータ
      ]
    )
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const selectInvoice = (index: number) => {
    setSelectedInvoice(invoices[index]);  // 請求書を選択
  };

  const deleteInvoice = (index: number) => {
    setInvoices((prevInvoices) => prevInvoices.filter((_, i) => i !== index));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, selectInvoice, selectedInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
