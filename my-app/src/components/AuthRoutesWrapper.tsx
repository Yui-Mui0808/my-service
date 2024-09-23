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

const AuthRoutesWrapper: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loading, setLoading] = useState(true);  // 初期はローディング状態

  useEffect(() => {
    // 認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('ユーザーがログインしています:', currentUser);
        navigate('/dashboard');
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
      
      {/* 他のルート */}
      <Route path="/" element={<InvoiceList />} />
      <Route path="/new-invoice" element={<NewInvoice />} />
      <Route path="/edit-invoice/:id" element={<EditInvoice />} />
      <Route path="/invoice-details/:invoiceNumber" element={<InvoiceDetails />} />
    </Routes>
  );
};

export default AuthRoutesWrapper;
