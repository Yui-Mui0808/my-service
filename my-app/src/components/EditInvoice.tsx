import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewInvoice.css';

// Item型を定義
type Item = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: string;
  total: number;
};

const EditInvoice: React.FC = () => {
  const { id } = useParams();  // ← IDを取得
  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');

  const [items, setItems] = useState<Item[]>([
    { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 },
  ]);

  // 請求書データのロード処理
  useEffect(() => {
    // APIまたはローカルストレージから請求書データをロード
    // 以下は仮のデータ。実際にはバックエンドと連携するか、保存済みデータから取得します。
    const savedInvoice = {
      invoiceNumber: 'INV-001',
      invoiceDate: '2024-01-01',
      dueDate: '2024-01-31',
      companyName: '株式会社 鬼殺隊',
      clientName: '取引先企業',
      items: [
        { name: '商品A', quantity: 1, unit: '個', unitPrice: 500, taxRate: '10%', total: 500 }
      ]
    };

    setInvoiceNumber(savedInvoice.invoiceNumber);
    setInvoiceDate(savedInvoice.invoiceDate);
    setDueDate(savedInvoice.dueDate);
    setCompanyName(savedInvoice.companyName);
    setClientName(savedInvoice.clientName);
    setItems(savedInvoice.items);
  }, [id]);  // IDが変わるたびにデータをロード

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: '', unitPrice: 0, taxRate: '10%', total: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const updatedItems: Record<keyof Item, any>[] = [...items];
    updatedItems[index][field] = value;

    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }

    setItems(updatedItems as Item[]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
        <button className="save-btn">保存する</button>
      </div>
    </div>
  );
};

export default EditInvoice;
