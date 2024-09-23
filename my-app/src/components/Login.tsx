// src/components/Login.tsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // useNavigateをインポート
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();  // useNavigateを使用

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ログイン処理が開始されました'); // ログインが開始されたか確認するログ

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('ログイン成功:', user);  // ログイン成功時のログ
        console.log('ダッシュボードへ遷移します');  // ここで遷移することを確認するログ
        navigate('/dashboard');  // ログイン成功後にダッシュボードへ遷移
        console.log('ダッシュボードへの遷移が完了しました');  // 遷移が完了したかを確認
      })
      .catch((error) => {
        console.error('ログイン失敗:', error);  // ログイン失敗時のエラーログ
      });
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
