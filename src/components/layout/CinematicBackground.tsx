// src/components/layout/CinematicBackground.tsx
import styles from './CinematicBackground.module.scss';

export default function CinematicBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nebula} />
      <div className={styles.grid} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}