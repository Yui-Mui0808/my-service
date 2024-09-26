// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';  // 共通ヘッダーをインポート
import './Dashboard.css';  // スタイルをインポート

const Dashboard: React.FC = () => {
  const navigate = useNavigate();  // ここでnavigateを定義

  return (
    <div className="dashboard-container">
      <Header />  {/* ログアウトボタン付きの共通ヘッダーを表示 */}

      {/* ダッシュボードのタイトルを左揃えに */}
      <div className="dashboard-title">
        <h1>ダッシュボード</h1>
      </div>

      <main className="dashboard-main">
        {/* ボタンは中央揃えのまま */}
        <button
          className="invoice-list-button"
          onClick={() => navigate('/')}
        >
          請求書リストへ移動
        </button>
      </main>
    </div>
  );
};

export default Dashboard;