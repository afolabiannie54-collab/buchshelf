import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./EditGoalModal.module.css";
import { FiX } from "react-icons/fi";

export default function EditGoalModal({
  isOpen,
  onClose,
  currentYear,
  onSave,
  initialTarget,
}) {
  const [target, setTarget] = useState(() =>
    typeof initialTarget === "number" && initialTarget > 0
      ? String(initialTarget)
      : ""
  );
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const v = {};
    const num = parseInt(target, 10);
    if (Number.isNaN(num) || num < 1 || num > 500) {
      v.target = "Enter a number between 1 and 500";
    }
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    onSave(parseInt(target, 10));
    onClose();
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-goal-title"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={22} />
        </button>
        <div className={styles.header}>
          <h2 id="edit-goal-title">Edit Goal ({currentYear})</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>
            Target (books)
            <input
              className={styles.input}
              type="number"
              min={1}
              max={500}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              aria-invalid={!!errors.target}
            />
            {errors.target && (
              <span className={styles.errorText}>{errors.target}</span>
            )}
          </label>
          <button className={styles.primaryBtn} type="submit">
            Save Goal
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
