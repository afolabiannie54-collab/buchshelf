import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./FAQ.module.css";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Can I read books inside BuchShelf?",
      a: "BuchShelf is a tracker and discovery tool. It helps you organize and find books, but reading happens on external platforms or with physical copies.",
    },
    {
      q: "Where do the book details come from?",
      a: "We use the public Google Books API with strict filters to keep results high‑quality.",
    },
    {
      q: "Why do search results change sometimes?",
      a: "Public search APIs are non‑deterministic. We added guardrails, but some variability is expected.",
    },
    {
      q: "How is my data stored?",
      a: "For this project, account data is stored locally in your browser (localStorage).",
    },
    {
      q: "Can I set reading goals?",
      a: "Yes! You can set yearly reading goals in your library and track your progress throughout the year.",
    },
    {
      q: "Is my library data private?",
      a: "Absolutely. Your library and reading data stay in your browser's local storage. We don't collect or share your personal reading information.",
    },
    {
      q: "Can I export my library?",
      a: "Currently, your data is stored locally. We're considering export features in future updates to help you backup your library.",
    },
    {
      q: "How do I favorite a book?",
      a: "Click the heart icon on any book card in your library to mark it as a favorite. Your favorites are easily accessible for quick reference.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Find answers to common questions about BuchShelf
        </p>
      </header>

      <section className={styles.faqSection}>
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`${styles.faqItem} ${
              openIndex === i ? styles.active : ""
            }`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(i)}
              aria-expanded={openIndex === i}
            >
              <span className={styles.questionText}>{item.q}</span>
              <FiChevronDown
                className={`${styles.icon} ${
                  openIndex === i ? styles.iconOpen : ""
                }`}
              />
            </button>
            <div
              className={`${styles.faqAnswer} ${
                openIndex === i ? styles.answerOpen : ""
              }`}
            >
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
