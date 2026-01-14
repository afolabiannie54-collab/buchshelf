import styles from "./Contact.module.css";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name || name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message || message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return; // rely on inline field errors only
    // Simulate sending
    setStatus({ type: "success", message: "Thanks! We'll get back to you." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Contact Us</h1>
        <p>Questions or feedback? Send us a note.</p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </label>
        <label>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </label>
        <label>
          Message
          <textarea
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <span className={styles.error}>{errors.message}</span>
          )}
        </label>
        <button className={styles.submitBtn} type="submit">
          Send
        </button>
        {status && (
          <p
            className={
              status.type === "success" ? styles.success : styles.error
            }
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
