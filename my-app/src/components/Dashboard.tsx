// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Header from './Header';  // 共通ヘッダーをインポート
import './Dashboard.css';  // スタイルをインポート

const Dashboard: React.FC = () => {
  const navigate = useNavigate();  // ここでnavigateを定義
  const location = useLocation();  // locationを使ってnavigateのstateを取得
  const isSignupComplete = location.state?.isSignupComplete || false;  // フラグを取得

  return (
    <div className="dashboard-container">
      <Header />  {/* ログアウトボタン付きの共通ヘッダーを表示 */}

      {/* ダッシュボードのタイトルを左揃えに */}
      <div className="dashboard-title">
        <h1>ダッシュボード</h1>
      </div>

      {/* 新規ユーザー登録が完了した場合にメッセージを表示 */}
      {isSignupComplete && (
        <div className="signup-complete-message">
          <p style={{ color: 'green' }}>新規ユーザー登録が完了しました。</p>
        </div>
      )}

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