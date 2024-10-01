// src/context/InvoiceContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { invoices as initialInvoices } from '../data'; // 仮データをインポート
import { Invoice } from '../models/InvoiceModel'; // Invoiceモデルをインポート

// コンテキストの型定義
type InvoiceContextType = {
  invoices: Invoice[];
  addInvoice: (newInvoice: Invoice) => void;  // addInvoice を追加
  updateInvoice: (id: string, updatedInvoice: Invoice) => void;
  deleteInvoice: (id: string) => void;  // 削除用関数を追加
};

// InvoiceContextの作成
export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// InvoiceProviderコンポーネントの作成
export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>(initialInvoices);  // 仮データを初期値として設定

  // 初回読み込み時にlocalStorageからデータを取得
  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoiceData(JSON.parse(savedInvoices));
    }
  }, []);

  // 請求書データをlocalStorageに保存する関数
  const saveToLocalStorage = (invoices: Invoice[]) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  };

  // 請求書を追加する関数
  const addInvoice = (newInvoice: Invoice) => {
    const updatedInvoices = [...invoiceData, newInvoice];
    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices); // localStorageに保存
  };
  
  // 請求書を更新する関数
  const updateInvoice = (id: string, updatedInvoice: Invoice) => {
    const updatedInvoices = invoiceData.map((invoice) =>
      invoice.invoiceNumber === id ? updatedInvoice : invoice
    );
    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices); // localStorageに保存
  };

  // 請求書を削除する関数
  const deleteInvoice = (invoiceNumber: string) => {
    const updatedInvoices = invoiceData.filter(invoice => invoice.invoiceNumber !== invoiceNumber);
    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices); // localStorageに保存
  };
  
  // InvoiceContext.Provider の value に addInvoice を渡す
  return (
    <InvoiceContext.Provider value={{ invoices: invoiceData, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
