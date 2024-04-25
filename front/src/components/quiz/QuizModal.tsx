import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const QuizModal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '20px', zIndex: 1000 }}>
      <p>{message}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default QuizModal;
