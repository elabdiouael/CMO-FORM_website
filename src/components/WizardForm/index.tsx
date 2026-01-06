// src/components/WizardForm/index.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WizardForm.module.scss";
import { wizardConfig } from "../../data/questions";

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Screen d'accueil

  const totalSteps = wizardConfig.length;
  const currentSlide = wizardConfig[currentStep];

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // LOGIC JDIIDA:
    // Auto-advance ghir ila kanet so2al wa7d f page w kan type radio
    if (type === 'radio' && currentSlide.fields.length === 1 && currentStep < totalSteps) {
      setTimeout(() => handleNext(), 300);
    }
  };

  const isStepValid = () => {
    if (!currentSlide) return false;
    // Check ghir l fields li 'required: true'
    return currentSlide.fields.every((field) => {
      if (!field.required) return true; // Ila machi darouri, daz
      return formData[field.name] && formData[field.name].trim() !== '';
    });
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
      // FormSubmit ID Updated
      const response = await fetch("https://formsubmit.co/ajax/edfbd1ce307b760f636d77ff2f617eb6", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleNext(); // Move to success slide
      } else {
        alert("Erreur de connexion. 3awed jareb.");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      alert("Erreur technique. 3awed jareb mn be3d.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const cinematicVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction < 0 ? 50 : -50 }),
  };

  // Welcome Screen
  if (!hasStarted) {
    return (
      <div className={styles.introScreen}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1>CMO48 Strategy 2026</h1>
          <p>3awenna nrasmo l'mosta9bal dyal le club.</p>
          <button onClick={() => setHasStarted(true)} className={styles.btnStart}>Bda L'formulaire</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.cinematicWrapper}>
      <div className={styles.wizardContainer}>
        {/* Progress bar simple */}
        <div className={styles.progressBar}>
            <div 
                className={styles.progressFill} 
                style={{ width: `${((currentStep) / totalSteps) * 100}%` }} 
            />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={cinematicVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.slideContent}
          >
            {currentStep < totalSteps ? (
              <form onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <span className={styles.stepIndicator}>Step {currentStep + 1}/{totalSteps}</span>
                    <h2>{currentSlide.title}</h2>
                    <p>{currentSlide.description}</p>
                </div>

                <div className={styles.fieldsGrid}>
                  {currentSlide.fields.map((field) => (
                    <div key={field.name} className={styles.fieldWrapper}>
                        {field.type !== 'radio' && <label className={styles.fieldLabel}>{field.label} {!field.required && <span className={styles.optional}>(Optionnel)</span>}</label>}
                        
                        {field.type === 'radio' ? (
                             <div className={styles.radioGroup}>
                                <p className={styles.radioTitle}>{field.label}</p>
                                <div className={styles.radioOptions}>
                                    {field.options?.map((opt) => (
                                    <label key={opt} className={`${styles.radioCard} ${formData[field.name] === opt ? styles.selected : ''}`}>
                                        <input type="radio" name={field.name} value={opt} onChange={handleChange} checked={formData[field.name] === opt} />
                                        <span>{opt}</span>
                                    </label>
                                    ))}
                                </div>
                             </div>
                        ) : field.type === 'select' ? (
                            <select name={field.name} value={formData[field.name] || ''} onChange={handleChange} className={styles.selectInput}>
                                <option value="" disabled>Choisir une option...</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea name={field.name} placeholder={field.placeholder} value={formData[field.name] || ''} onChange={handleChange} rows={4} />
                        ) : (
                            <input type={field.type} name={field.name} placeholder={field.placeholder} value={formData[field.name] || ''} onChange={handleChange} />
                        )}
                    </div>
                  ))}
                </div>
                
                <div className={styles.actions}>
                  <button type="button" onClick={handlePrev} disabled={currentStep === 0} className={styles.btnPrev}>Retour</button>
                  
                  {currentStep === totalSteps - 1 ? (
                    <button type="submit" className={styles.btnSubmit} disabled={!isStepValid() || isSubmitting}>
                        {isSubmitting ? 'Envoi...' : 'Envoyer'}
                    </button>
                  ) : (
                    <button type="button" onClick={handleNext} className={styles.btnNext} disabled={!isStepValid()}>
                        Suivant
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className={styles.successState}>
                <h2>Mrc a sat!</h2>
                <p>L'feedback dyalk wselna. Nchoufouk 9rib f CMO48.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}