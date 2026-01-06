import styles from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export default function Input({ label, multiline, ...props }: Props) {
  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>
      {multiline ? (
        <textarea className={styles.input} rows={4} {...(props as any)} />
      ) : (
        <input className={styles.input} {...props} />
      )}
    </div>
  );
}