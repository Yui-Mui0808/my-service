import React from 'react';
import './Modal.css'; // モーダル用のCSSをインポート

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceNumber?: string;
  customer?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm, invoiceNumber, customer }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-body">
        <h3>本当に削除しますか？</h3>
        <p>請求書番号: {invoiceNumber}</p>
        <p>取引先: {customer}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="delete-button">削除する</button>
          <button onClick={onClose} className="cancel-button">キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
