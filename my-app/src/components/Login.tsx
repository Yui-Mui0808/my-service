
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ログイン処理が開始されました'); 

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('ログイン成功:', user);  
        navigate('/dashboard');  
      })
      .catch((error) => {
        console.error('ログイン失敗:', error);  
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
      <p>アカウントをお持ちでないですか？ 
         <Link to="/signup">新規ユーザー登録はこちら</Link>
      </p>
    </div>
  );
};

export default Login;
