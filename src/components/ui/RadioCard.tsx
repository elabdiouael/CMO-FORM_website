// src/components/ui/RadioCard.tsx
import styles from './RadioCard.module.scss';

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function RadioCard({ label, selected, onClick }: Props) {
  return (
    <div 
      className={`${styles.card} ${selected ? styles.selected : ''}`} 
      onClick={onClick}
    >
      <div className={styles.indicator}>
        {selected && <div className={styles.dot} />}
      </div>
      <span className={styles.text}>{label}</span>
    </div>
  );
}