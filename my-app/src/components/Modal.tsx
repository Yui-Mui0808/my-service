import React from "react";
import "./Modal.css";

// モーダルで受け取るpropsの型を定義
interface ModalProps {
  invoiceNumber: string;
  clientName: string;
  onClose: () => void;
  onDeleteConfirm: () => void;  // 削除確認時の関数を追加
}

const Modal: React.FC<ModalProps> = ({ invoiceNumber, clientName, onClose, onDeleteConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {/* 文言を2つの<p>タグに分ける */}
        <p className="modal-title">本当に削除しますか？</p>
        <p className="modal-subtitle">この操作は元に戻すことができません。</p>
        
        <p>請求書番号: {invoiceNumber}</p>
        <p>取引先: {clientName}</p>
        <div className="modal-buttons">
        <button className="delete-confirm-btn" onClick={onDeleteConfirm}>削除する</button> {/* 変更済み */}
        <button className="cancel-btn" onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
