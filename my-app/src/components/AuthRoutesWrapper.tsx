// src/components/AuthRoutesWrapper.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InvoiceList from './InvoiceList';
import NewInvoice from './NewInvoice';
import EditInvoice from './EditInvoice';
import InvoiceDetails from './InvoiceDetails';
import Login from './Login';
import Dashboard from './Dashboard';
import app from '../firebaseConfig';

const AuthRoutesWrapper: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth(app); //修正

  const [loading, setLoading] = useState(true);  // 初期はローディング状態

  useEffect(() => {
    console.log('onAuthStateChangedを監視しています');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('ユーザーがログインしています:', currentUser);
        // 現在のページが /dashboard でない場合のみ遷移
        if (window.location.pathname === '/login') {
          navigate('/dashboard');
        }
      } else {
        console.log('ユーザーがログインしていません');
        navigate('/login');
      }
      setLoading(false);  // 認証確認が終わったらローディング終了
    });
  
    return () => unsubscribe();
  }, [auth, navigate]);

  // ローディング中の表示
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* ログイン画面 */}
      <Route path="/login" element={<Login />} />
      {/* ダッシュボード画面 */}
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
