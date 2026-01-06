// src/components/wizard/ProgressBar.tsx
import styles from './ProgressBar.module.scss';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = ((current) / total) * 100;
  return (
    <div className={styles.container}>
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
    </div>
  );
}