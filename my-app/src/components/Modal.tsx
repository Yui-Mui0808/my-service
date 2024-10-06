import React from "react";
import "./Modal.css";

// モーダルで受け取るpropsの型を定義
interface ModalProps {
  invoiceNumber?: string;  // 任意プロパティに変更
  clientName?: string;     // 任意プロパティに変更
  onClose: () => void;
  onDeleteConfirm?: () => void;  // 削除確認時の関数は任意
  onConfirm?: () => void; // 保存確認時の関数を追加
  message?: string;  // メッセージを追加
}

const Modal: React.FC<ModalProps> = ({ invoiceNumber, clientName, onClose, onDeleteConfirm, onConfirm, message }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {/* messageがある場合には保存モーダルのテキストを表示 */}
        {message ? (
          <p className="modal-title">{message}</p>
        ) : (
          <>
            <p className="modal-title">本当に削除しますか？</p>
            <p className="modal-subtitle">この操作は元に戻すことができません。</p>
            <p>請求書番号: {invoiceNumber}</p>
            <p>取引先: {clientName}</p>
          </>
        )}
        <div className="modal-buttons">
          {/* onConfirmが存在する場合は保存ボタン */}
          {onConfirm && (
            <button className="save-confirm-btn" onClick={onConfirm}>
              保存する
            </button>
          )}
          {/* onDeleteConfirmが存在する場合は削除ボタン */}
          {onDeleteConfirm && (
            <button className="delete-confirm-btn" onClick={onDeleteConfirm}>
              削除する
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
