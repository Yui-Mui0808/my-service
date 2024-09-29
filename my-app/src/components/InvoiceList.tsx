import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvoiceList.css';
import { InvoiceContext } from '../context/InvoiceContext';
import Modal from './Modal';
import { Invoice } from '../models/InvoiceModel';
import Header from './Header';

function InvoiceList() {
  const { invoices, deleteInvoice } = useContext(InvoiceContext) || { invoices: [], deleteInvoice: () => {} };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoices || []);
  const [searchedInvoice, setSearchedInvoice] = useState<Invoice | null>(null);

  const [invoiceDateFrom, setInvoiceDateFrom] = useState('');
  const [invoiceDateTo, setInvoiceDateTo] = useState('');
  const [paymentDueFrom, setPaymentDueFrom] = useState('');
  const [paymentDueTo, setPaymentDueTo] = useState('');
  const [clientName, setClientName] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = invoices.filter((invoice) => {
      const matchesText = invoice.invoiceNumber.includes(searchTerm) || invoice.companyName.includes(searchTerm);
      const matchesInvoiceDate =
        (!invoiceDateFrom || new Date(invoice.invoiceDate) >= new Date(invoiceDateFrom)) &&
        (!invoiceDateTo || new Date(invoice.invoiceDate) <= new Date(invoiceDateTo));
      const matchesPaymentDue =
        (!paymentDueFrom || new Date(invoice.paymentDue) >= new Date(paymentDueFrom)) &&
        (!paymentDueTo || new Date(invoice.paymentDue) <= new Date(paymentDueTo));
      const matchesClient = !clientName || invoice.companyName === clientName;

      return matchesText && matchesInvoiceDate && matchesPaymentDue && matchesClient;
    });
    setFilteredInvoices(filtered);

    if (filtered.length > 0) {
      setSearchedInvoice(filtered[0]);
    }
  };

  const handleDeleteClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleEditClick = (invoiceNumber: string) => {
    navigate(`/edit-invoice/${invoiceNumber}`);
  };

  const handleDetailsClick = (invoiceNumber: string) => {
    navigate(`/invoice-details/${invoiceNumber}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedInvoice) {
      deleteInvoice(selectedInvoice.invoiceNumber);
      setFilteredInvoices(filteredInvoices.filter(invoice => invoice.invoiceNumber !== selectedInvoice.invoiceNumber));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <h1>請求書リスト</h1>
      <div className="container">
        <div className="search-container">
        <div className="search-field">
  <label>請求書番号や取引先を検索:</label>
  <input
    type="text"
    placeholder="請求書番号や取引先を検索..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={handleSearch}>検索</button> {/* 検索ボタンを右に配置 */}
</div>


          {/* 請求日と支払期限を横並びに */}
          <div className="date-row">
  <div className="date-container">
    <label>請求日:</label>
    <div className="date-range">
      <input type="date" value={invoiceDateFrom} onChange={(e) => setInvoiceDateFrom(e.target.value)} />
      <span>～</span>
      <input type="date" value={invoiceDateTo} onChange={(e) => setInvoiceDateTo(e.target.value)} />
    </div>
  </div>

  <div className="date-container">
    <label>支払期限:</label>
    <div className="date-range">
      <input type="date" value={paymentDueFrom} onChange={(e) => setPaymentDueFrom(e.target.value)} />
      <span>～</span>
      <input type="date" value={paymentDueTo} onChange={(e) => setPaymentDueTo(e.target.value)} />
    </div>
  </div>
</div>

          <div className="client-container">
            <label>取引先:</label>
            <select value={clientName} onChange={(e) => setClientName(e.target.value)}>
              <option value="">全ての取引先</option>
              {invoices.map((invoice) => (
                <option key={invoice.companyName} value={invoice.companyName}>
                  {invoice.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="new-invoice-btn" onClick={() => navigate('/new-invoice')}>
          新規請求書作成
        </button>
      </div>

      <table className="table-container">
        <thead>
          <tr>
            <th></th>
            <th>請求書番号</th>
            <th>取引先</th>
            <th>請求日</th>
            <th>支払期限</th>
            <th>合計金額</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td><input type="checkbox" /></td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.companyName}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.paymentDue}</td>
              <td>{invoice.totalAmount.toLocaleString()}円</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(invoice.invoiceNumber)}>編集</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(invoice)}>削除</button>
                <button className="details-btn" onClick={() => handleDetailsClick(invoice.invoiceNumber)}>詳細</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {searchedInvoice && (
        <div className="search-results">
          <h2 className="invoice-details-title">請求書詳細</h2>
          <table className="invoice-details-table">
            <tbody>
              <tr>
                <th>請求書番号</th>
                <td>{searchedInvoice.invoiceNumber}</td>
              </tr>
              <tr>
                <th>取引先</th>
                <td>{searchedInvoice.companyName}</td>
              </tr>
              <tr>
                <th>請求日</th>
                <td>{searchedInvoice.invoiceDate}</td>
              </tr>
              <tr>
                <th>支払期限</th>
                <td>{searchedInvoice.paymentDue}</td>
              </tr>
              <tr>
                <th>合計金額</th>
                <td>{searchedInvoice.totalAmount.toLocaleString()}円</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <Modal
          invoiceNumber={selectedInvoice?.invoiceNumber ?? ''}
          clientName={selectedInvoice?.companyName ?? ''}
          onClose={handleCloseModal}
          onDeleteConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default InvoiceList;
