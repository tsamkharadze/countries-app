// ConfirmationModal.tsx
import React from "react";
import styles from "./ConfirmationModal.module.css"; // Create this CSS file for styling
import { useParams } from "react-router-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2> {lang === "ka" ? "დადასტურება" : "Confirmation"}</h2>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {lang === "ka" ? "დიახ" : "Confirm"}
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            {lang === "ka" ? "გაუქმება" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
