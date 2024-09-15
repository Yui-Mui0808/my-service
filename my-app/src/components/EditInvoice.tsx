import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewInvoice.css';
import { InvoiceContext } from '../context/InvoiceContext';
import { Invoice, InvoiceItem } from '../models/InvoiceModel';

const EditInvoice: React.FC = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const { invoices, updateInvoice } = useContext(InvoiceContext) || { invoices: [], updateInvoice: () => {} };

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 }
  ]);

  // 請求書データのロード処理
  useEffect(() => {
    const savedInvoice = invoices.find((invoice) => invoice.invoiceNumber === id);
    if (savedInvoice) {
      setInvoiceNumber(savedInvoice.invoiceNumber);
      setInvoiceDate(savedInvoice.invoiceDate);
      setDueDate(savedInvoice.paymentDue);
      setCompanyName(savedInvoice.companyName);
      setClientName(savedInvoice.customer);
      setItems(savedInvoice.items);
    }
  }, [id, invoices]);

  // 明細を追加
  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 }]);
  };

  // 明細を更新
const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
  const updatedItems = [...items];

  // フィールドの型をチェックして適切にキャスト
  if (field === 'quantity' || field === 'unitPrice') {
    updatedItems[index][field] = Number(value);  // 'quantity' と 'unitPrice' は数値として扱う
  } else if (field === 'name' || field === 'unit' || field === 'taxRate') {
    updatedItems[index][field] = String(value);  // 他のフィールドは文字列として扱う
  }

  // 合計金額を再計算
  updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;

  setItems(updatedItems);
};


  // subtotal の計算
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // 保存処理
const handleSave = () => {
  // Invoice クラスのインスタンスを作成
  const updatedInvoice = new Invoice(
    invoiceNumber,
    invoiceDate,
    dueDate,
    companyName,
    clientName,
    items,
    total, // 合計金額を反映（後で再計算）
    ''  // registrationNumber（必要に応じて追加）
  );

  // 合計金額の計算
  updatedInvoice.totalAmount = updatedInvoice.calculateTotal();

  // 請求書の更新
  updateInvoice(id as string, updatedInvoice);
  
  navigate('/');  // リストページに戻る
};

  return (
    <div className="invoice-form">
      <h1>請求書の編集</h1>
      <div className="top-container">
        {/* 請求書の入力フォーム (略) */}
      </div>

      <div className="section">
        <h2>詳細</h2>
        <table>
          <thead>
            <tr>
              {/* 明細入力フォーム (略) */}
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
                {/* 他のフィールドも同様に修正 */}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-btn" onClick={addItem}>+ 明細を追加</button>
      </div>

      <div className="section totals">
        <div>小計: {subtotal}円</div>
        <div>消費税: {tax}円</div>
        <div>合計: {total}円</div>
      </div>

      <div className="section buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>戻る</button>
        <button className="cancel-btn">キャンセル</button>
        <button className="save-btn" onClick={handleSave}>保存する</button>
      </div>
    </div>
  );
};

export default EditInvoice;

