import React from 'react';
import './App.css';

function App() {
  return (
    <div className="invoice-container">
      <h1 className="invoice-title">請求書</h1>

      <div className="invoice-header">
        <div className="invoice-section-left">
          <h2>請求先:</h2>
          <p>株式会社 藤屋敷</p>
          <p>登録番号: T9876543210123</p>
        </div>
        <div className="invoice-section-right">
          <h2>請求元:</h2>
          <p>株式会社 鬼殺隊</p>
          <p>登録番号: T1234567890123</p>
        </div>
      </div>

      <div className="invoice-section">
        <h2>請求項目:</h2>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>項目</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left' }}>任務による隊士の移動にかかった交通費</td>
              <td>250,000円</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>刀の修理費・隊服の修繕費</td>
              <td>3,000,000円</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>小計: 3,250,000円</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>消費税 (10.0%): 325,000円</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right', fontWeight: 'bold' }}>合計金額: 3,575,000円</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
