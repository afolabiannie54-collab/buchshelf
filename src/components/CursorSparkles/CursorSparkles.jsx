import { useEffect, useRef } from "react";
import styles from "./CursorSparkles.module.css";

export default function CursorSparkles() {
  const throttleRef = useRef(0);
  const THROTTLE_DELAY = 30; // Throttle to ~30ms

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - throttleRef.current < THROTTLE_DELAY) return;
      throttleRef.current = now;

      // Create sparkles more frequently for that fairy dust effect
      if (Math.random() > 0.1) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    const createSparkle = (x, y) => {
      const sparkle = document.createElement("div");
      sparkle.className = styles.sparkle;

      // Random offset so they spread around cursor
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;

      sparkle.style.left = x + offsetX + "px";
      sparkle.style.top = y + offsetY + "px";

      // Smaller sizes for glitter effect
      const size = Math.random() * 10 + 2; // 2-6px (much smaller!)
      sparkle.style.width = size + "px";
      sparkle.style.height = size + "px";

      // Random colors for shimmer effect
      const colors = [
        "radial-gradient(circle, #ffd700, transparent)",
        "radial-gradient(circle, #ffed4e, transparent)",
        "radial-gradient(circle, #ecbb19ff, transparent)",
        "radial-gradient(circle, #d4af37, transparent)",
      ];
      sparkle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000); // Slightly faster removal
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
