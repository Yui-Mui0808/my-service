import React, { useState } from 'react';  // useStateをインポート
import './InvoiceList.css';  // CSSファイルのインポート
import Modal from './Modal';  // モーダルコンポーネントのインポート

function InvoiceList() {
  // モーダルの表示状態と選択された請求書の情報を管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({ number: '', client: '' });

  // 削除ボタンクリック時にモーダルを表示
  const handleDeleteClick = (invoiceNumber: string, clientName: string) => {
    setSelectedInvoice({ number: invoiceNumber, client: clientName });
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <h1>請求書リスト</h1>
      <div className="container">
        <div className="search-container">
          <input type="text" placeholder="請求書番号や取引先を検索..." />
          <button>検索</button>
        </div>
        <button className="new-invoice-btn">新規請求書作成</button>
      </div>
      
      <table className="table-container">
        <thead>
          <tr>
            <th>請求書番号</th>
            <th>取引先</th>
            <th>請求日</th>
            <th>支払期限</th>
            <th>合計金額</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INV-001</td>
            <td>株式会社　鬼殺隊</td>
            <td>2024-01-01</td>
            <td>2024-01-31</td>
            <td>605,000円</td>
            <td>
              <button className="edit-btn">編集</button>
              <button className="delete-btn" onClick={() => handleDeleteClick('INV-001', '株式会社　鬼殺隊')}>削除</button>
            </td>
          </tr>
          <tr>
            <td>INV-002</td>
            <td>有限会社　蝶屋敷</td>
            <td>2024-01-01</td>
            <td>2024-01-31</td>
            <td>198,000円</td>
            <td>
              <button className="edit-btn">編集</button>
              <button className="delete-btn" onClick={() => handleDeleteClick('INV-001', '有限会社　蝶屋敷')}>削除</button>
            </td>
          </tr>
          <tr>
            <td>INV-002</td>
            <td>株式会社　霞柱邸</td>
            <td>2024-01-01</td>
            <td>2024-01-31</td>
            <td>495,000円</td>
            <td>
              <button className="edit-btn">編集</button>
              <button className="delete-btn" onClick={() => handleDeleteClick('INV-001', '株式会社　霞柱邸')}>削除</button>
            </td>
          </tr>
          {/* 他の請求書も同様 */}
        </tbody>
      </table>

      {/* モーダルの表示 */}
      {isModalOpen && (
        <Modal
          invoiceNumber={selectedInvoice.number}
          clientName={selectedInvoice.client}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default InvoiceList;

