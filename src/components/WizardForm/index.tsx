
// src/components/WizardForm/index.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WizardForm.module.scss";
import { wizardConfig } from "../../data/questions";

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = wizardConfig.length;
  const currentSlide = wizardConfig[currentStep];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value });

    if (type === 'radio' && value && currentStep < totalSteps) {
      setTimeout(() => handleNext(), 400);
    }
  };

  const isStepValid = () => {
    if (!currentSlide) return false;
    return currentSlide.fields.every(
      (field) => formData[field.name] && formData[field.name].trim() !== ''
    );
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/edfbd1ce307b760f636d77ff2f617eb6", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleNext();
      } else {
        alert("Signal lost. Please try again.");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      alert("A cosmic ray interfered with the transmission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cinematicVariants = {
    enter: (direction: number) => ({ opacity: 0, z: -200, rotateY: direction > 0 ? 45 : -45 }),
    center: { opacity: 1, z: 0, rotateY: 0 },
    exit: (direction: number) => ({ opacity: 0, z: 200, rotateY: direction < 0 ? 45 : -45 }),
  };
  const textStagger = { hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const textFadeIn = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } } };

  return (
    <div className={styles.cinematicWrapper}>
      <div className={styles.wizardContainer}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={cinematicVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ z: { type: 'spring', stiffness: 100, damping: 15 }, rotateY: { type: 'spring', stiffness: 100, damping: 15 }, opacity: { duration: 0.4 } }}
            className={styles.slideContent}
          >
            {currentStep < totalSteps ? (
              <motion.div variants={textStagger} initial="hidden" animate="show" onSubmit={handleSubmit} as="form">
                <motion.h2 variants={textFadeIn}>{currentSlide.title}</motion.h2>
                <motion.p variants={textFadeIn}>{currentSlide.description}</motion.p>
                <motion.div variants={textFadeIn}>
                  {currentSlide.fields.map((field) =>
                    field.type === 'radio' ? (
                      <div key={field.name} className={styles.choiceGroup}>
                        {field.options?.map((opt) => (
                          <div key={opt}>
                            <input type="radio" id={`${field.name}-${opt}`} name={field.name} value={opt} onChange={handleChange} checked={formData[field.name] === opt} />
                            <label htmlFor={`${field.name}-${opt}`} className={styles.choiceLabel}>{opt}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div key={field.name} className={styles.inputWrapper}>
                        <input type={field.type} name={field.name} placeholder={field.label} onChange={handleChange} value={formData[field.name] || ''} />
                      </div>
                    )
                  )}
                </motion.div>
                
                <motion.div variants={textFadeIn} className={styles.actions}>
                  {currentStep > 0 && <button type="button" onClick={handlePrev}>Back</button>}
                  {currentStep < totalSteps - 1 && <button type="button" onClick={handleNext} className={styles.btnPrimary} disabled={!isStepValid()}>Next</button>}
                  {currentStep === totalSteps - 1 && <button type="submit" className={styles.btnSubmit} disabled={!isStepValid() || isSubmitting}>{isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}</button>}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div variants={textStagger} initial="hidden" animate="show" className={styles.successState}>
                <motion.h2 variants={textFadeIn}>Transmission Complete.</motion.h2>
                <motion.p variants={textFadeIn}>Thank you. We have received your signal.</motion.p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.progressPips}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className={`${styles.pip} ${index < currentStep ? styles.active : ''} ${index === currentStep ? styles.active : ''}`} />
        ))}
      </div>
    </div>
  );
}