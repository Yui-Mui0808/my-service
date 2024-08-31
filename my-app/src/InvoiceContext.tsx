// src/InvoiceContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { InvoiceModel } from './models/InvoiceModel';
import { invoices as defaultInvoices } from './data/invoiceData';

interface InvoiceContextProps {
  invoices: InvoiceModel[];
  selectedInvoice: InvoiceModel | null;
  selectInvoice: (index: number) => void;
}

export const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoices] = useState<InvoiceModel[]>(defaultInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModel | null>(null);

  const selectInvoice = (index: number) => {
    setSelectedInvoice(invoices[index]);
  };

  return (
    <InvoiceContext.Provider value={{ invoices, selectedInvoice, selectInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
