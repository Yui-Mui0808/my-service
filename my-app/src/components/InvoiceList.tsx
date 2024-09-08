import React, { useState, useContext } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import Modal from './Modal';
import './InvoiceList.css'; // CSS をインポート
import { Invoice } from '../models/InvoiceModel'; // Invoice 型をインポート

const InvoiceList: React.FC = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('InvoiceList must be used within an InvoiceProvider');

  const { invoices, selectInvoice, deleteInvoice } = context;

  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null); // Invoice 型を適用
  const [searchTerm, setSearchTerm] = useState(''); // 検索用の state
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices); // フィルタリングされた請求書
  const [sortConfig, setSortConfig] = useState<{ key: keyof Invoice; direction: 'asc' | 'desc' } | null>(null); // ソート設定

  const handleSort = (key: keyof Invoice) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredInvoices(sortedInvoices);
  };

  // モーダルを開く処理（削除用）
  const handleDeleteClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  // 編集ボタンがクリックされたときの処理を追加（編集用）
  const handleEditClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);  // 編集用のモーダルを表示（今は削除用と同じ処理）
  };

  // モーダルで削除を確認
  const handleConfirmDelete = () => {
    if (selectedInvoice) {
      deleteInvoice(invoices.indexOf(selectedInvoice));
      setShowModal(false);
    }
  };

  // 検索処理
  const handleSearch = () => {
    const filtered = invoices.filter(invoice =>
      invoice.invoiceNumber.includes(searchTerm) ||
      invoice.customer.includes(searchTerm)
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div className="container">
      <div className="header-row">
        <h2 className="title">請求書リスト</h2>
        <button className="new-invoice-button">新規請求書作成</button>  {/* 新規請求書作成ボタンを追加 */}
      </div>
  
      {/* 検索バー */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="請求書番号や取引先を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>検索</button>
      </div>
      
      {/* 請求書リスト */}
      <table className="invoice-list">
        {/* ソート用のカラム */}
        <thead>
          <tr>
            <th onClick={() => handleSort('invoiceNumber')}>請求書番号</th>  {/* ソート用クリックイベント */}
            <th onClick={() => handleSort('customer')}>取引先</th>  {/* ソート用クリックイベント */}
            <th onClick={() => handleSort('invoiceDate')}>請求日</th>  {/* ソート用クリックイベント */}
            <th onClick={() => handleSort('paymentDue')}>支払期限</th>  {/* ソート用クリックイベント */}
            <th onClick={() => handleSort('totalAmount')}>合計金額</th>  {/* ソート用クリックイベント */}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.invoiceNumber} onClick={() => selectInvoice(invoices.indexOf(invoice))}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.paymentDue}</td>
              <td>{invoice.totalAmount.toLocaleString()}円</td>  {/* ここを修正 */}
              <td>
                <button onClick={() => handleDeleteClick(invoice)} className="delete-button">削除</button>
                <button onClick={() => handleEditClick(invoice)} className="edit-button">編集</button>  {/* handleEditClick を設定 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* 削除確認モーダル */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        invoiceNumber={selectedInvoice?.invoiceNumber}
        customer={selectedInvoice?.customer}
      />
    </div>
  );
};

export default InvoiceList;
