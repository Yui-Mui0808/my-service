import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';  // signOutをインポート
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // ログアウト処理（モーダル表示）
  const handleLogout = () => {
    setShowModal(true);  // モーダルを表示する
  };

  // ログアウト確定処理
  const confirmLogout = () => {
    const auth = getAuth();  // Firebase Authのインスタンスを取得
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました。");
        navigate('/login');  // ログアウト後にログイン画面へ遷移
      })
      .catch((error) => {
        console.error("ログアウト中にエラーが発生しました:", error);
      });
  };

  const cancelLogout = () => {
    setShowModal(false);  // モーダルを閉じる
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>ダッシュボード</h1>
        <button className="logout-button" onClick={handleLogout}>ログアウト</button>
      </header>

      <main className="dashboard-main">
        {/* メインコンテンツ、請求書リストのリンクを追加 */}
        <button className="invoice-list-button" onClick={() => {
          console.log("請求書リストページに移動します");
          navigate('/');  // ここでの遷移が発生しているか確認
          console.log("遷移完了");
      }}>
          請求書リストに移動
      </button>
      </main>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>ログアウトしますか？</p>
            <button onClick={confirmLogout}>はい</button>
            <button onClick={cancelLogout}>いいえ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
