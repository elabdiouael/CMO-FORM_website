"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./HoloCard.module.scss";

// Hado homa les 5 styles li ghan-le3bo bihom
type CardVariant = 'holo' | 'neon' | 'crimson' | 'void' | 'synthwave';

interface Props {
  children: React.ReactNode;
  variant?: CardVariant; // Prop jdida
}

export default function HoloCard({ children, variant = 'holo' }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={styles.perspectiveContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {/* Kan-passiw l-variant l class css */}
      <div className={`${styles.glassCard} ${styles[variant]}`}>
        <div className={styles.scanlines} />
        
        {/* Hada howa l-container li fih scroll */}
        <div className={styles.scrollContent}>
          {children}
        </div>

        <div className={styles.borderGlow} />
      </div>
    </motion.div>
  );
}