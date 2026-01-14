import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ManageAccountModal.module.css";
import { FiX } from "react-icons/fi";

export default function ManageAccountModal({
  onClose,
  user,
  onUpdateProfile,
  onUpdatePassword,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateProfile = () => {
    const newErrors = {};
    const trimmedUser = (username || "").trim();
    if (!trimmedUser || trimmedUser.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!currentPassword) {
      newErrors.currentPassword = "Enter your current password";
    }
    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    } else if (currentPassword && newPassword === currentPassword) {
      newErrors.newPassword = "New password must be different";
    }
    if (!confirmNewPassword || confirmNewPassword !== newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setStatus(null);
    const v = validateProfile();
    setErrors(v);
    if (Object.keys(v).length > 0) return; // rely on inline field errors only
    try {
      onUpdateProfile({ username: username.trim(), email });
      setStatus({ type: "success", message: "Profile updated" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setStatus(null);
    const v = validatePassword();
    setErrors(v);
    if (Object.keys(v).length > 0) return; // rely on inline field errors only
    try {
      onUpdatePassword(currentPassword, newPassword);
      setStatus({ type: "success", message: "Password updated" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
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
        aria-labelledby="manage-account-title"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={22} />
        </button>
        <div className={styles.header}>
          <h2 id="manage-account-title">Manage Account</h2>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "profile" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "password" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("password")}
            >
              Password
            </button>
          </div>
        </div>

        {activeTab === "profile" && (
          <form
            className={styles.form}
            onSubmit={handleProfileUpdate}
            noValidate
          >
            <label>
              Username
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <span className={styles.errorText}>{errors.username}</span>
              )}
            </label>
            <label>
              Email
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </label>
            <button className={styles.primaryBtn} type="submit">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form
            className={styles.form}
            onSubmit={handlePasswordUpdate}
            noValidate
          >
            <label>
              Current Password
              <input
                className={styles.input}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {errors.currentPassword && (
                <span className={styles.errorText}>
                  {errors.currentPassword}
                </span>
              )}
            </label>
            <label>
              New Password
              <input
                className={styles.input}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <span className={styles.errorText}>{errors.newPassword}</span>
              )}
            </label>
            <label>
              Confirm New Password
              <input
                className={styles.input}
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              {errors.confirmNewPassword && (
                <span className={styles.errorText}>
                  {errors.confirmNewPassword}
                </span>
              )}
            </label>
            <button className={styles.primaryBtn} type="submit">
              Update Password
            </button>
          </form>
        )}

        {status && (
          <p
            className={
              status.type === "success" ? styles.success : styles.error
            }
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
