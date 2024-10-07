import React, { useState, useContext } from 'react';  // ← useContextを追加
import { useNavigate } from 'react-router-dom'; // ← この行を追加
import './NewInvoice.css';
import { InvoiceContext } from '../context/InvoiceContext';  // ← InvoiceContextをインポート

// Item型を定義
type Item = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: string;
  total: number;
};

const NewInvoice: React.FC = () => {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error('InvoiceContextが提供されていません');
  }

  const { invoices, addInvoice, updateInvoiceStatus } = context;  // `updateInvoiceStatus` を追加
  const navigate = useNavigate();  // ← ここに追加

  // モーダル表示状態管理
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);  // 請求書発行モーダルの状態管理
  const [isSaved, setIsSaved] = useState(false);
  const [isIssued, setIsIssued] = useState(false);  // 請求書発行完了メッセージ用
  const [canIssueInvoice, setCanIssueInvoice] = useState(false);  // 請求書発行ボタンの有効/無効管理
  const [showAlert, setShowAlert] = useState(false);

  const handleCancel = () => {
    setShowCancelModal(false);
    setShowAlert(true); // キャンセル通知を表示
    setTimeout(() => {
      setShowAlert(false);
      navigate('/'); // キャンセル後にリストページに戻る
    }, 3000); // 3秒間通知を表示してからリダイレクト
  };

  const handleContinue = () => {
    setShowCancelModal(false); // モーダルを閉じる
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);  // 保存確認用モーダルを表示
  };
  
  const handleConfirmSave = () => {
    handleSave();
    setShowSaveModal(false);
    setIsSaved(true);  // 保存完了メッセージを表示

    // 5秒後に保存メッセージを非表示にする
    setTimeout(() => {
      setIsSaved(false);
    }, 5000);  // 5秒後にメッセージを消す
  };

  const handleCancelSave = () => {
    setShowSaveModal(false);
  };

  // 請求書発行処理
  const handleIssueClick = () => {
    setShowIssueModal(true);
  };

  const handleConfirmIssue = () => {
    setIsIssued(true);  // 発行完了メッセージ表示
    updateInvoiceStatus(invoiceNumber, true);  // 発行ステータスを更新
    setShowIssueModal(false);
  };

  const handleCancelIssue = () => {
    setShowIssueModal(false);
  };

  // 最新の請求書番号を基に次の請求書番号を生成する関数
  const generateInvoiceNumber = () => {
    if (invoices.length === 0) {
      return 'INV-001';  // リストが空の場合は最初の番号を設定
    }

    const latestInvoice = invoices[invoices.length - 1];
    const latestNumber = latestInvoice.invoiceNumber.split('-')[1];  // "INV-001" の "001" 部分を取得
    const nextNumber = String(parseInt(latestNumber) + 1).padStart(3, '0');  // 次の番号を生成
    return `INV-${nextNumber}`;  // 次の請求書番号を生成
  };

  const invoiceNumber = generateInvoiceNumber();  // 自動採番

  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');

  // itemsの型をItem[]に設定
  const [items, setItems] = useState<Item[]>([
    { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 },
  ]);

  // 明細項目を追加する処理
  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 }]);
  };

  // 明細項目の更新処理
  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const updatedItems: Record<keyof Item, any>[] = [...items];

    updatedItems[index][field] = value;

    // 数量と単価から自動的に合計を計算
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }

    // 税率に応じた計算を反映
    const taxRate = updatedItems[index].taxRate;
    const taxMultiplier = taxRate === '8%' ? 0.08 : 0.1;  // 8% または 10%を適用
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice * (1 + taxMultiplier);

    setItems(updatedItems as Item[]);
  };

  // 小計を個数×単価の合計に修正
const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

// 消費税の計算
const taxRate = items.some(item => item.taxRate === '8%') ? 0.08 : 0.10;  // 各商品に対して税率を確認
const tax = subtotal * taxRate;

// 合計金額の計算
const total = subtotal + tax;

  // 請求書を保存する処理
  const handleSave = () => {
    const newInvoice = {
      invoiceNumber,
      invoiceDate,
      paymentDue: dueDate,
      companyName,
      customer: clientName,
      items,
      totalAmount: total,
      registrationNumber: '', // 必要なら追加
      isIssued: false, // ここで未発行状態を追加
      // もし `Invoice` に `calculateTotal` というメソッドがある場合は以下を追加
      calculateTotal: () => {
        return total;
      }
    };

    addInvoice(newInvoice);
    setIsSaved(true);         // 保存メッセージを表示
    setCanIssueInvoice(true); // 請求書発行ボタンを有効化
  };

  return (
    <div className="invoice-form">
      <h1>請求書の新規作成</h1>

      {showAlert && <div className="alert-message">キャンセルしました</div>} {/* キャンセル通知 */}
      {isSaved && <p style={{ color: 'green' }}>請求書を保存しました。</p>}
      {isIssued && <p style={{ color: 'green' }}>請求書を発行しました。</p>}  {/* 請求書発行メッセージ */}

      <div className="top-container">
        <div className="left-container">
          <div className="form-group">
            <label>請求先</label>
            <div className="input-with-span">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="取引先"
              />
              <span>御中</span>
            </div>
          </div>

          <div className="form-group">
            <label>請求書番号</label>
            <input type="text" value={invoiceNumber} disabled />
          </div>

          <div className="form-group">
            <label>請求日</label>
            <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>支払期限</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>

        <div className="right-container">
          <div className="form-group">
            <label>自社名</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="自社名"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>詳細</h2>
        <table>
          <thead>
            <tr>
              <th>品番・品名</th>
              <th>数量</th>
              <th>単位</th>
              <th>単価</th>
              <th>税率</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    placeholder="品番・品名"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    placeholder="単位"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                    min="0"
                  />
                </td>
                <td>
                  <select value={item.taxRate} onChange={(e) => updateItem(index, 'taxRate', e.target.value)}>
                    <option value="10%">10%</option>
                    <option value="8%">8%</option>
                  </select>
                </td>
                <td>{item.total.toLocaleString()}円</td>  {/* カンマ付きの表示 */}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-btn" onClick={addItem}>+ 明細を追加</button>
      </div>

      <div className="section totals">
        <div>小計: {subtotal.toLocaleString()}円</div>  {/* 小計にカンマ追加 */}
        <div>消費税: {tax.toLocaleString()}円</div>  {/* 消費税にカンマ追加 */}
        <div>合計: {total.toLocaleString()}円</div>  {/* 合計にカンマ追加 */}
      </div>
      
      <div className="section buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>戻る</button>
        <button className="cancel-btn" onClick={() => setShowCancelModal(true)}>キャンセル</button> {/* モーダル表示 */}
        <button className="save-btn" onClick={handleSaveClick}>保存する</button>
        <button className="issue-btn" disabled={!canIssueInvoice} onClick={handleIssueClick}>
          請求書発行
        </button>
      </div>
            
      {/* キャンセル確認モーダル */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>請求書作成をキャンセルしますか？</p>
            <div className="modal-buttons">
              <button className="cancel-confirm-btn" onClick={handleCancel}>キャンセルする</button>
              <button className="continue-btn" onClick={handleContinue}>作成を続ける</button>
            </div>
          </div>
        </div>
      )}
      {/* 保存確認モーダル */}
      {showSaveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>請求書を保存しますか？</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmSave}>はい</button>
              <button className="cancel-btn" onClick={handleCancelSave}>いいえ</button>
            </div>
          </div>
        </div>
      )}

      {/* 発行確認モーダル */}
      {showIssueModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>請求書を発行しますか？</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmIssue}>はい</button>
              <button className="cancel-btn" onClick={handleCancelIssue}>いいえ</button>
            </div>
          </div>
        </div>
      )}

      {/* 保存完了メッセージ */}
      {isSaved && <p style={{ color: 'green' }}>請求書を保存しました。</p>}
    </div>
  );
};

export default NewInvoice;
