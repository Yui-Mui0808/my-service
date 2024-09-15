import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvoiceList.css';
import { InvoiceContext } from '../context/InvoiceContext';  // コンテキストをインポート
import Modal from './Modal';
import { Invoice } from '../models/InvoiceModel';  // Invoice型をインポート

function InvoiceList() {
  const { invoices } = useContext(InvoiceContext) || { invoices: [] };  // Contextからデータを取得
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);  // Invoice型を指定
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [searchedInvoice, setSearchedInvoice] = useState<Invoice | null>(null);  // 検索結果の請求書を保存するためのstate
  const navigate = useNavigate();

  // 検索ボタンクリック時の処理
  const handleSearch = () => {
    const filtered = invoices.filter((invoice) =>
      invoice.invoiceNumber.includes(searchTerm) || invoice.companyName.includes(searchTerm)
    );
    setFilteredInvoices(filtered);

    // 最初の検索結果を詳細表示するためにセット
    if (filtered.length > 0) {
      setSearchedInvoice(filtered[0]); // 検索結果の最初の請求書を表示
    }
  };

  // 削除ボタンクリック時にモーダルを表示
  const handleDeleteClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);  // Invoice全体を渡す
    setIsModalOpen(true);
  };

  // 編集ボタンクリック時に編集ページへ遷移
  const handleEditClick = (invoiceNumber: string) => {
    navigate(`/edit-invoice/${invoiceNumber}`);
  };

  // 詳細ボタンクリック時に詳細ページへ遷移
  const handleDetailsClick = (invoiceNumber: string) => {
    navigate(`/invoice-details/${invoiceNumber}`);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <h1>請求書リスト</h1>
      <div className="container">
        {/* 検索ボックスとボタン */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="請求書番号や取引先を検索..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>検索</button>
        </div>
        <button className="new-invoice-btn" onClick={() => navigate('/new-invoice')}>
          新規請求書作成
        </button>
      </div>

      {/* 請求書リストのテーブル */}
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

      {/* 検索結果の詳細表示 */}
      {searchedInvoice && (
        <div className="search-results">
          <h2 className="invoice-details-title">請求書詳細</h2>  {/* タイトルを変更＆左揃え */}
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
        />
      )}
    </div>
  );
}

export default InvoiceList;

