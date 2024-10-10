import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { invoices as initialInvoices } from '../data'; // 仮データをインポート
import { Invoice } from '../models/InvoiceModel'; // InvoiceModel からインポート

// コンテキストの型定義
type InvoiceContextType = {
  invoices: Invoice[];  // Invoice[] 型
  addInvoice: (newInvoice: Invoice) => void;
  updateInvoice: (id: string, updatedInvoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  updateInvoiceStatus: (id: string, isIssued: boolean) => void;
};

// InvoiceContextの作成
export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// InvoiceProviderコンポーネントの作成
export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>(initialInvoices);

  // この後に console.log を入れて、invoiceData の中身を確認します。
console.log("現在の invoiceData の中身: ", invoiceData);  // ← これを追加！

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
    saveToLocalStorage(updatedInvoices);
  };

  // 請求書を更新する関数
  const updateInvoice = (id: string, updatedInvoice: Invoice) => {
    const updatedInvoices = invoiceData.map((invoice) =>
      invoice.invoiceNumber === id ? updatedInvoice : invoice
    );
    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices);
  };

  // 請求書のステータスを更新する関数
  const updateInvoiceStatus = (id: string, isIssued: boolean) => {
    // id と isIssued にどんな値が入っているかを確認する
    console.log("id: ", id);  // ← idの値を確認する
    console.log("isIssued: ", isIssued);  // ← isIssuedの値を確認する

    const updatedInvoices = invoiceData.map(invoice =>
      invoice.invoiceNumber === id ? { ...invoice, isIssued } : invoice
    );
    
    // 更新後の請求書リストを確認する
    console.log("更新後の請求書リスト: ", updatedInvoices);  // ← これも追加

    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices); // ローカルストレージに保存
  };

  // 請求書を削除する関数
  const deleteInvoice = (invoiceNumber: string) => {
    const updatedInvoices = invoiceData.filter(invoice => invoice.invoiceNumber !== invoiceNumber);
    setInvoiceData(updatedInvoices);
    saveToLocalStorage(updatedInvoices);
  };

  return (
    <InvoiceContext.Provider value={{ invoices: invoiceData, addInvoice, updateInvoice, deleteInvoice, updateInvoiceStatus }}>
      {children}
    </InvoiceContext.Provider>
  );
};
