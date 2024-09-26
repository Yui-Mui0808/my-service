import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // useLocationをインポート
import { getAuth, signOut } from 'firebase/auth'; // Firebaseの認証機能をインポート
import './Header.css'; // スタイルのインポート

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();  // 現在のページのパスを取得
    const auth = getAuth();
    const [showModal, setShowModal] = useState(false); // モーダルの表示状態を管理するstate

  const handleLogout = () => {
    setShowModal(true); // モーダルを表示
  };

  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました。");
        navigate('/login'); // ログイン画面へ遷移
      })
      .catch((error) => {
        console.error("ログアウト中にエラーが発生しました:", error);
      });
  };

  const cancelLogout = () => {
    setShowModal(false); // モーダルを閉じる
  };

  return (
    <header className="header">
      <h1>Invox</h1>

      {/* 戻るボタンとログアウトボタンを並べる */}
      <div className="button-container">
        {/* 戻るボタンは/dashboardページ以外で表示 */}
        {location.pathname !== '/dashboard' && (
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            戻る
          </button>
        )}

        {/* ログアウトボタン */}
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </div>

      {/* ログアウト確認モーダル */}
      {showModal && (
        <div style={{
          position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
          display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <p>ログアウトしますか？</p>
            <button onClick={confirmLogout} style={{ marginRight: '1rem', backgroundColor: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
              はい
            </button>
            <button onClick={cancelLogout} style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
              いいえ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
