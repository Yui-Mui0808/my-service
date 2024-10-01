import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);  // モーダル表示の状態管理
  const auth = getAuth();
  const navigate = useNavigate();

  // モーダルの「はい」ボタンクリックでユーザー登録
  const handleConfirmSignup = () => {
    setShowModal(false);  // モーダルを閉じる
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('ユーザー登録成功:', user);
        // ダッシュボードへ遷移し、新規登録完了メッセージを表示する
        navigate('/dashboard', { state: { isSignupComplete: true } });
      })
      .catch((error) => {
        console.error('ユーザー登録失敗:', error);
      });
  };

  // モーダルの「いいえ」ボタンクリックでモーダルを閉じる
  const handleCancelSignup = () => {
    setShowModal(false);
  };

  // 「登録」ボタンクリックでモーダルを表示
  const handleSignupClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);  // モーダルを表示
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('ユーザー登録成功:', user);
        
        // ダッシュボードに遷移するとき、登録完了フラグを渡す
        navigate('/dashboard', { state: { isSignupComplete: true } });
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
        {/* 登録ボタンに handleSignupClick を適用 */}
        <button type="button" onClick={handleSignupClick}>登録する</button>
      </form>
      <p>既にアカウントをお持ちですか？ <a href="/login">ログインはこちら</a></p>
      
      {/* モーダルの表示 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>新規ユーザー登録をしますか？</h3>
            <div className="modal-buttons">
              <button onClick={handleConfirmSignup}>はい</button>
              <button onClick={handleCancelSignup}>いいえ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
