import { useState } from 'react';

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => {});

  const showConfirmDialog = (msg, confirmCallback) => {
    setMessage(msg);
    setOnConfirm(() => confirmCallback);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    showConfirmDialog,
    handleConfirm,
    handleCancel
  };
};
