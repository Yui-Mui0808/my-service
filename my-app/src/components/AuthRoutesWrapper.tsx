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

// コンポーネントの型
interface AuthRoutesWrapperProps {
  children?: React.ReactNode;
}

const AuthRoutesWrapper: React.FC<AuthRoutesWrapperProps> = () => {
  const navigate = useNavigate();
  const auth = getAuth(app); // Firebase Auth を初期化

  // ローディング状態の管理
  const [loading, setLoading] = useState(true);

  // ユーザーの認証状態を監視する useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ログインしているユーザーが '/login' または '/signup' ページにアクセスしている場合
        if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
          // 何もしない (ページ遷移を防ぐ)
          return;
        } else {
          // それ以外のページであればダッシュボードにリダイレクト
          navigate('/dashboard');
        }
      } else {
        // ユーザーがログインしていない場合
        if (window.location.pathname !== '/signup') {
          // 新規登録ページでない場合、ログインページにリダイレクト
          navigate('/login');
        }
      }
      // ローディング状態を解除
      setLoading(false);
    });

    // クリーンアップ関数
    return () => unsubscribe();
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
