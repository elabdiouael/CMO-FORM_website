"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import styles from "./CyberSelect.module.scss";

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export default function CyberSelect({ label, options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <label className={styles.label}>{label}</label>
      
      <div 
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value || "Select Protocol..."}
        </span>
        <ChevronDown size={18} className={`${styles.icon} ${isOpen ? styles.rotated : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(opt => (
              <div 
                key={opt} 
                className={`${styles.option} ${value === opt ? styles.selected : ''}`}
                onClick={() => { onChange(opt); setIsOpen(false); }}
              >
                {opt}
                {value === opt && <Check size={14} className={styles.check} />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}