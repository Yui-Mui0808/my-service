// src/context/InvoiceContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { invoices } from '../data'; // 仮データをインポート
import { Invoice } from '../models/InvoiceModel'; // Invoiceモデルをインポート

// コンテキストの型定義
type InvoiceContextType = {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
};

// InvoiceContextの作成
export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// InvoiceProviderコンポーネントの作成
export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>(invoices);  // 仮データを初期値として設定

  return (
    <InvoiceContext.Provider value={{ invoices: invoiceData, setInvoices: setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};
