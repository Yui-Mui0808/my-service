// src/context/InvoiceContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { invoices as initialInvoices } from '../data'; // 仮データをインポート
import { Invoice } from '../models/InvoiceModel'; // Invoiceモデルをインポート

// コンテキストの型定義
type InvoiceContextType = {
  invoices: Invoice[];
  updateInvoice: (id: string, updatedInvoice: Invoice) => void;
};

// InvoiceContextの作成
export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// InvoiceProviderコンポーネントの作成
export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>(initialInvoices);  // 仮データを初期値として設定

  // 請求書を更新する関数
  const updateInvoice = (id: string, updatedInvoice: Invoice) => {
    setInvoiceData((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.invoiceNumber === id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <InvoiceContext.Provider value={{ invoices: invoiceData, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
