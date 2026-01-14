// BookIllustration.jsx
import styles from "./Bookillustration.module.css";

export default function BookIllustration() {
  return (
    <>
      <PaperTexture />
      <FloatingElements />
      <AnimatedBook />
    </>
  );
}

function PaperTexture() {
  return <div className={styles.paperTexture}></div>;
}

function FloatingElements() {
  return (
    <div className={styles.floatingContainer}>
      {/* Small book 1 */}
      <svg
        className={`${styles.element} ${styles.book1}`}
        width="60"
        height="80"
        viewBox="0 0 60 80"
      >
        <rect
          x="5"
          y="5"
          width="50"
          height="70"
          fill="#9caf88"
          rx="3"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <rect x="5" y="5" width="50" height="15" fill="#6b8e23" rx="3" />
        <line
          x1="10"
          y1="68"
          x2="50"
          y2="68"
          stroke="#5d4037"
          strokeWidth="1.5"
        />
      </svg>

      {/* Small book 2 */}
      <svg
        className={`${styles.element} ${styles.book2}`}
        width="50"
        height="70"
        viewBox="0 0 50 70"
      >
        <rect
          x="5"
          y="5"
          width="40"
          height="60"
          fill="#c2674f"
          rx="3"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <circle cx="25" cy="35" r="12" fill="#f4a460" opacity="0.6" />
      </svg>

      {/* Small book 3 */}
      <svg
        className={`${styles.element} ${styles.book3}`}
        width="55"
        height="75"
        viewBox="0 0 55 75"
      >
        <rect
          x="5"
          y="5"
          width="45"
          height="65"
          fill="#f5d5c8"
          rx="3"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <rect x="10" y="10" width="35" height="10" fill="#d46a6a" rx="2" />
      </svg>

      {/* Bookmark 1 */}
      <svg
        className={`${styles.element} ${styles.bookmark1}`}
        width="30"
        height="50"
        viewBox="0 0 30 50"
      >
        <path
          d="M 5 5 L 25 5 L 25 45 L 15 35 L 5 45 Z"
          fill="#f4a460"
          stroke="#5d4037"
          strokeWidth="2"
        />
      </svg>

      {/* Bookmark 2 */}
      <svg
        className={`${styles.element} ${styles.bookmark2}`}
        width="30"
        height="50"
        viewBox="0 0 30 50"
      >
        <path
          d="M 5 5 L 25 5 L 25 45 L 15 35 L 5 45 Z"
          fill="#d46a6a"
          stroke="#5d4037"
          strokeWidth="2"
        />
      </svg>

      {/* Heart/Favorite icon */}
      <svg
        className={`${styles.element} ${styles.heart}`}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path
          d="M 20 35 C 20 35 5 25 5 15 C 5 10 8 7 12 7 C 15 7 18 9 20 12 C 22 9 25 7 28 7 C 32 7 35 10 35 15 C 35 25 20 35 20 35 Z"
          fill="#d46a6a"
          stroke="#5d4037"
          strokeWidth="2"
        />
      </svg>

      {/* Reading glasses */}
      <svg
        className={`${styles.element} ${styles.glasses}`}
        width="70"
        height="30"
        viewBox="0 0 70 30"
      >
        <circle
          cx="15"
          cy="15"
          r="10"
          fill="none"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <circle
          cx="55"
          cy="15"
          r="10"
          fill="none"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <line
          x1="25"
          y1="15"
          x2="45"
          y2="15"
          stroke="#5d4037"
          strokeWidth="2"
        />
        <path
          d="M 5 15 Q 0 12 0 10"
          stroke="#5d4037"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 65 15 Q 70 12 70 10"
          stroke="#5d4037"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Coffee/Tea cup */}
      <svg
        className={`${styles.element} ${styles.cup}`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <rect
          x="10"
          y="20"
          width="25"
          height="20"
          fill="#f5d5c8"
          stroke="#5d4037"
          strokeWidth="2"
          rx="2"
        />
        <path
          d="M 35 25 Q 42 25 42 32 Q 42 39 35 39"
          stroke="#5d4037"
          strokeWidth="2"
          fill="none"
        />
        {/* Steam */}
        <path
          d="M 15 18 Q 17 12 15 8"
          stroke="#c2674f"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 23 18 Q 25 12 23 8"
          stroke="#c2674f"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 30 18 Q 32 12 30 8"
          stroke="#c2674f"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

function AnimatedBook() {
  return (
    <div className={styles.bookContainer}>
      <svg viewBox="0 0 800 600" className={styles.book}>
        {/* LEFT PAGE - Changing covers */}
        <path
          d="M 100 150 Q 100 120 120 120 L 380 120 Q 400 120 400 150 L 400 480 Q 400 500 380 500 L 120 500 Q 100 500 100 480 Z"
          fill="#fdfbf7"
          stroke="#5d4037"
          strokeWidth="3"
        />

        {/* Left changing page 1 - Green */}
        <g className={styles.leftPage1}>
          <rect
            x="140"
            y="170"
            width="220"
            height="290"
            fill="#6b8e23"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="140" y="170" width="220" height="70" fill="#9caf88" rx="8" />
          <circle cx="250" cy="320" r="50" fill="#f4a460" opacity="0.5" />
          <line
            x1="160"
            y1="440"
            x2="340"
            y2="440"
            stroke="#f4a460"
            strokeWidth="3"
          />
        </g>

        {/* Left changing page 2 - Amber */}
        <g className={styles.leftPage2}>
          <rect
            x="140"
            y="170"
            width="220"
            height="290"
            fill="#f4a460"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="140" y="170" width="220" height="70" fill="#c2674f" rx="8" />
          <circle cx="250" cy="310" r="45" fill="#fdfbf7" opacity="0.6" />
          <line
            x1="160"
            y1="440"
            x2="340"
            y2="440"
            stroke="#9caf88"
            strokeWidth="3"
          />
        </g>

        {/* Left changing page 3 - Peach */}
        <g className={styles.leftPage3}>
          <rect
            x="140"
            y="170"
            width="220"
            height="290"
            fill="#f5d5c8"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="140" y="170" width="220" height="70" fill="#d46a6a" rx="8" />
          <rect
            x="170"
            y="270"
            width="140"
            height="8"
            fill="#c2674f"
            opacity="0.5"
            rx="4"
          />
          <rect
            x="170"
            y="300"
            width="160"
            height="8"
            fill="#c2674f"
            opacity="0.5"
            rx="4"
          />
          <line
            x1="160"
            y1="440"
            x2="340"
            y2="440"
            stroke="#f4a460"
            strokeWidth="3"
          />
        </g>

        {/* Left changing page 4 - Sage */}
        <g className={styles.leftPage4}>
          <rect
            x="140"
            y="170"
            width="220"
            height="290"
            fill="#9caf88"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="140" y="170" width="220" height="70" fill="#6b8e23" rx="8" />
          <circle cx="220" cy="320" r="40" fill="#f5d5c8" opacity="0.6" />
          <circle cx="280" cy="350" r="30" fill="#f4a460" opacity="0.5" />
          <line
            x1="160"
            y1="440"
            x2="340"
            y2="440"
            stroke="#f4a460"
            strokeWidth="3"
          />
        </g>

        {/* RIGHT PAGE - Changing covers */}
        <path
          d="M 400 150 Q 400 120 420 120 L 680 120 Q 700 120 700 150 L 700 480 Q 700 500 680 500 L 420 500 Q 400 500 400 480 Z"
          fill="#fdfbf7"
          stroke="#5d4037"
          strokeWidth="3"
        />

        {/* Right changing page 1 - Terracotta */}
        <g className={styles.rightPage1}>
          <rect
            x="440"
            y="170"
            width="220"
            height="290"
            fill="#c2674f"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="440" y="170" width="220" height="70" fill="#d46a6a" rx="8" />
          <circle cx="550" cy="300" r="45" fill="#f4a460" opacity="0.5" />
          <circle cx="590" cy="350" r="35" fill="#f5d5c8" opacity="0.6" />
          <line
            x1="460"
            y1="440"
            x2="640"
            y2="440"
            stroke="#f4a460"
            strokeWidth="3"
          />
        </g>

        {/* Right changing page 2 - Peach */}
        <g className={styles.rightPage2}>
          <rect
            x="440"
            y="170"
            width="220"
            height="290"
            fill="#f5d5c8"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="440" y="170" width="220" height="70" fill="#f4a460" rx="8" />
          <rect
            x="470"
            y="260"
            width="160"
            height="10"
            fill="#d46a6a"
            opacity="0.6"
            rx="5"
          />
          <rect
            x="470"
            y="290"
            width="140"
            height="10"
            fill="#d46a6a"
            opacity="0.6"
            rx="5"
          />
          <rect
            x="470"
            y="320"
            width="150"
            height="10"
            fill="#d46a6a"
            opacity="0.6"
            rx="5"
          />
          <line
            x1="460"
            y1="440"
            x2="640"
            y2="440"
            stroke="#c2674f"
            strokeWidth="3"
          />
        </g>

        {/* Right changing page 3 - Sage */}
        <g className={styles.rightPage3}>
          <rect
            x="440"
            y="170"
            width="220"
            height="290"
            fill="#9caf88"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="440" y="170" width="220" height="70" fill="#6b8e23" rx="8" />
          <circle cx="520" cy="310" r="40" fill="#f5d5c8" opacity="0.6" />
          <circle cx="590" cy="340" r="30" fill="#f4a460" opacity="0.5" />
          <rect
            x="480"
            y="390"
            width="140"
            height="12"
            fill="#fdfbf7"
            opacity="0.5"
            rx="6"
          />
          <line
            x1="460"
            y1="440"
            x2="640"
            y2="440"
            stroke="#f4a460"
            strokeWidth="3"
          />
        </g>

        {/* Right changing page 4 - Amber */}
        <g className={styles.rightPage4}>
          <rect
            x="440"
            y="170"
            width="220"
            height="290"
            fill="#f4a460"
            rx="8"
            stroke="#5d4037"
            strokeWidth="2"
          />
          <rect x="440" y="170" width="220" height="70" fill="#c2674f" rx="8" />
          <circle cx="550" cy="320" r="55" fill="#fdfbf7" opacity="0.6" />
          <rect
            x="480"
            y="380"
            width="140"
            height="8"
            fill="#5d4037"
            opacity="0.3"
            rx="4"
          />
          <rect
            x="480"
            y="400"
            width="120"
            height="8"
            fill="#5d4037"
            opacity="0.3"
            rx="4"
          />
          <line
            x1="460"
            y1="440"
            x2="640"
            y2="440"
            stroke="#9caf88"
            strokeWidth="3"
          />
        </g>

        {/* Book spine/center */}
        <rect x="393" y="120" width="14" height="380" fill="#5d4037" />
        <rect
          x="398"
          y="130"
          width="4"
          height="360"
          fill="#f4a460"
          opacity="0.4"
        />

        {/* Shadow */}
        <ellipse
          cx="400"
          cy="510"
          rx="250"
          ry="20"
          fill="#5d4037"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
