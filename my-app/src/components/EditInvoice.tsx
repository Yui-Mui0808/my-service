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
    new InvoiceItem('', 1, '', 0, '10%', 0)
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
    setItems([...items, new InvoiceItem('', 1, '', 0, '10%', 0)]);
  };

  // 明細を更新
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    
    // `field` が 'quantity' か 'unitPrice' なら数値に変換
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index][field] = Number(value); 
    } else {
      updatedItems[index][field] = String(value); 
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
    // `calculateTotal()` メソッドを利用して、明細項目の合計を計算
    const updatedInvoice: Invoice = new Invoice(
      invoiceNumber,
      invoiceDate,
      dueDate,
      companyName,
      clientName,
      items,
      total, // 合計金額を反映
      ''  // registrationNumber（必要に応じて追加）
    );
    
    updateInvoice(id as string, updatedInvoice);  // 請求書の更新
    navigate('/');  // リストページに戻る
  };

  return (
    <div className="invoice-form">
      <h1>請求書の編集</h1>
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
                <td>{item.total}円</td>
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

