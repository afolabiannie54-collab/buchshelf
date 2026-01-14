import styles from "./ReadingGoalCard.module.css";

export default function ReadingGoalCard({
  year,
  target,
  count,
  percent,
  paceText,
  years,
  selectedYear,
  onYearChange,
  onEdit,
}) {
  const hasGoal = typeof target === "number" && target > 0;
  const barWidth = hasGoal ? `${percent}%` : "0%";
  const isPlaceholder = !hasGoal;

  return (
    <section className={styles.card} aria-label={`Reading goal for ${year}`}>
      <div>
        <h3 className={styles.title}>
          Goal {year}:{" "}
          {hasGoal ? `${count}/${target} (${percent}%)` : "No goal set"}
        </h3>
        {years && years.length > 1 && (
          <select
            className={styles.yearSelect}
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            aria-label="Select year to view progress"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.editBtn} type="button" onClick={onEdit}>
          {hasGoal ? "Edit Goal" : "Set Goal"}
        </button>
      </div>
      <div
        className={`${styles.barWrap}`}
        role="progressbar"
        aria-valuenow={hasGoal ? percent : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading goal progress"
      >
        <div
          className={`${styles.bar} ${isPlaceholder ? styles.placeholder : ""}`}
          style={{ width: barWidth }}
        />
      </div>
      <div className={styles.pace} aria-live="polite">
        {hasGoal
          ? paceText
          : "Set a reading goal for the year in your profile actions"}
      </div>
    </section>
  );
}
