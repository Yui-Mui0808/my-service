import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('ユーザー登録成功:', user);
        navigate('/dashboard');  // 登録後にダッシュボードへ遷移
      })
      .catch((error) => {
        console.error('ユーザー登録失敗:', error);
      });
  };

  return (
    <div className="signup-container">
      <h2>新規ユーザー登録</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">登録する</button>
      </form>
      <p>既にアカウントをお持ちですか？ <a href="/login">ログインはこちら</a></p>
    </div>
  );
};

export default Signup;
