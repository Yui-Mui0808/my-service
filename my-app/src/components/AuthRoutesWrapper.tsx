// src/components/AuthRoutesWrapper.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InvoiceList from './InvoiceList';
import NewInvoice from './NewInvoice';
import EditInvoice from './EditInvoice';
import InvoiceDetails from './InvoiceDetails';
import Login from './Login';
import Signup from './Signup'; // Signupコンポーネントをインポート
import Dashboard from './Dashboard';
import app from '../firebaseConfig'; // Firebase設定をインポート

const AuthRoutesWrapper: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth(app); // Firebase Auth を初期化

  const [loading, setLoading] = useState(true); // ローディング状態の管理

  // ユーザーの認証状態を監視する useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ログインしている場合
        if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
          // ログインしている場合はダッシュボードへリダイレクト
          navigate('/dashboard');
        }
        // それ以外のページにアクセスしている場合は何もしない
      } else {
        // ログインしていない場合、/signup 以外のページにいたらログインページへリダイレクト
        if (window.location.pathname !== '/signup') {
          navigate('/login');
        }
      }
      setLoading(false);  // 認証確認が終わったらローディング状態を解除
    });

    return () => unsubscribe();  // クリーンアップ関数
  }, [auth, navigate]);

  // ローディング中の表示
  if (loading) {
    return <div>Loading...</div>;
  }


  // ルート設定
  return (
    <Routes>
      {/* ログイン画面 */}
      <Route path="/login" element={<Login />} />

      {/* 新規ユーザー登録画面 */}
      <Route path="/signup" element={<Signup />} />

      {/* ダッシュボード */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 請求書リスト */}
      <Route path="/" element={<InvoiceList />} />

      {/* 新規請求書作成 */}
      <Route path="/new-invoice" element={<NewInvoice />} />

      {/* 請求書編集 */}
      <Route path="/edit-invoice/:id" element={<EditInvoice />} />

      {/* 請求書詳細 */}
      <Route path="/invoice-details/:invoiceNumber" element={<InvoiceDetails />} />
    </Routes>
  );
};

export default AuthRoutesWrapper;
