import styles from './TechInput.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export default function TechInput({ label, multiline, ...props }: Props) {
  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>
      {multiline ? (
        <textarea className={styles.input} rows={4} {...(props as any)} />
      ) : (
        <input className={styles.input} {...props} />
      )}
      <div className={styles.glowBar} />
    </div>
  );
}