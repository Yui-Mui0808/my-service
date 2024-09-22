import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ← useNavigate をインポート
import { InvoiceContext } from '../context/InvoiceContext';
import './InvoiceDetails.css';
import pdfFonts from '../fonts/vfs_fonts';

// 必要なモジュールのインポート（requireを使用）
const pdfMake = require('pdfmake/build/pdfmake');

// フォント設定
pdfMake.vfs = pdfFonts;

// フォント設定
pdfMake.fonts = {
  NotoSansJP: {
    normal: 'NotoSansJP-Regular.ttf',
    bold: 'NotoSansJP-Bold.ttf'  // セミコロンを追加
  },
};

const InvoiceDetails: React.FC = () => {
  const { invoiceNumber } = useParams<{ invoiceNumber: string }>();
  const { invoices } = useContext(InvoiceContext) || { invoices: [] };
  const navigate = useNavigate(); // ← useNavigate を使用

  // 該当する請求書を探す  
  const selectedInvoice = invoices.find((invoice) => invoice.invoiceNumber === invoiceNumber);

  if (!selectedInvoice) {
    return <p>該当する請求書が見つかりません。</p>;
  }

  // PDFを生成する関数
  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: '請求書', style: 'header' },
        `請求書番号: ${selectedInvoice.invoiceNumber}`,
        `会社名: ${selectedInvoice.companyName}`,
        `請求日: ${selectedInvoice.invoiceDate}`,
        `支払期限: ${selectedInvoice.paymentDue}`,
        '項目リスト',
        ...selectedInvoice.items.map((item, index) => (
          `${index + 1}. ${item.name}: ${item.total.toLocaleString()}円 (税率: ${item.taxRate})`
        )),
        `合計金額: ${selectedInvoice.totalAmount.toLocaleString()}円`
      ],
      styles: {
        header: { fontSize: 18, bold: true },
      },
      defaultStyle: {
        font: 'NotoSansJP'  // 日本語フォントを指定
      }
    };

    pdfMake.createPdf(docDefinition).open();  // PDF を生成し表示
  };

  return (
    <div className="invoice-details-container">
      <h2>請求書詳細ページ</h2>

      {/* 請求書基本情報をテーブル形式で表示 */}
      <table className="invoice-info-table">
        <tbody>
          <tr>
            <th>請求書番号:</th>
            <td>{selectedInvoice.invoiceNumber}</td>
          </tr>
          <tr>
            <th>会社名:</th>
            <td>{selectedInvoice.companyName}</td>
          </tr>
          <tr>
            <th>請求日:</th>
            <td>{selectedInvoice.invoiceDate}</td>
          </tr>
          <tr>
            <th>支払期限:</th>
            <td>{selectedInvoice.paymentDue}</td>
          </tr>
        </tbody>
      </table>

      <h3>項目リスト</h3>

      {/* 項目リストをテーブル形式で表示 */}
      <table className="item-list-table">
        <thead>
          <tr>
            <th>品名・説明</th>
            <th>数量</th>
            <th>単価</th>
            <th>税率</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          {selectedInvoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice.toLocaleString()}円</td>
              <td>{item.taxRate}</td>
              <td>{(item.quantity * item.unitPrice).toLocaleString()}円</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 合計金額を表示 */}
      <div className="total-amount">
        <strong>合計金額: {selectedInvoice.totalAmount.toLocaleString()}円</strong>
      </div>

      {/* 戻るボタンを追加 */}
      <button className="back-btn" onClick={() => navigate('/')}>戻る</button>

      {/* PDF生成ボタン */}
      <button className="pdf-btn" onClick={generatePDF}>PDF生成</button>
    </div>
  );
};

export default InvoiceDetails;