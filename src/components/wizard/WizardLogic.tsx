// src/components/wizard/WizardLogic.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WizardLogic.module.scss";
import { wizardConfig } from "../../data/questions";
import CinematicBackground from "../layout/CinematicBackground";
import ProgressBar from "./ProgressBar";
import RadioCard from "../ui/RadioCard";
import Input from "../ui/Input";

export default function WizardLogic() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const slide = wizardConfig[step];
  const total = wizardConfig.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    if(!slide) return false;
    return slide.fields.every(f => {
      if(!f.required) return true;
      const val = formData[f.name];
      return val && val.toString().trim() !== "";
    });
  };

  const nextStep = () => { if(step < total) setStep(s => s + 1); };
  const prevStep = () => { if(step > 0) setStep(s => s - 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isStepValid()) return;
    
    setIsSubmitting(true);
    try {
      // ✅ EMAIL DYALK CONFIGURÉ HNA
      const response = await fetch("https://formsubmit.co/ajax/elabdiouail@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "Nouveau Formulaire CMO 2026",
          _template: "table",
          ...formData
        }),
      });

      if (response.ok) {
        nextStep(); // Go to success screen
      } else {
        alert("Erreur technique. Merci de réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Config
  const variants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 }
  };

  // 1. Welcome Screen
  if (!hasStarted) {
    return (
      <CinematicBackground>
        <div className={styles.introCenter}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={styles.introTitle}>CMO48 <span className={styles.highlight}>2026</span></h1>
            <p className={styles.introDesc}>Rejoignez la vision. Façonnez l'avenir.</p>
            <button onClick={() => setHasStarted(true)} className={styles.btnStart}>Commencer l'expérience</button>
          </motion.div>
        </div>
      </CinematicBackground>
    );
  }

  // 2. Main Form & Success
  return (
    <CinematicBackground>
      <ProgressBar current={step} total={total} />

      <AnimatePresence mode="wait">
        {step < total ? (
          <motion.div 
            key={step}
            variants={variants}
            initial="initial" animate="animate" exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={styles.slideContainer}
          >
            <div className={styles.header}>
              <span className={styles.stepCount}>0{step + 1} / {total}</span>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.desc}>{slide.description}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fields}>
                {slide.fields.map(field => (
                  <div key={field.name} className={styles.fieldBlock}>
                    {field.type === 'radio' ? (
                      <div className={styles.radioGrid}>
                         <label className={styles.fieldLabel}>{field.label}</label>
                        {field.options?.map(opt => (
                          <RadioCard 
                            key={opt} 
                            label={opt} 
                            selected={formData[field.name] === opt}
                            onClick={() => {
                                handleChange(field.name, opt);
                                // Auto-next si question unique
                                if(slide.fields.length === 1 && !isSubmitting) setTimeout(nextStep, 350);
                            }}
                          />
                        ))}
                      </div>
                    ) : field.type === 'select' ? (
                        <div className={styles.selectWrapper}>
                            <label className={styles.fieldLabel}>{field.label}</label>
                            <div className={styles.selectContainer}>
                              <select 
                                  value={formData[field.name] || ''} 
                                  onChange={(e) => handleChange(field.name, e.target.value)}
                              >
                                  <option value="" disabled>Sélectionner une option...</option>
                                  {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                              <div className={styles.selectIcon}>▼</div>
                            </div>
                        </div>
                    ) : (
                      <Input 
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        multiline={field.type === 'textarea'}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <button type="button" onClick={prevStep} disabled={step === 0} className={styles.btnSec}>Retour</button>
                {step === total - 1 ? (
                   <button type="submit" disabled={!isStepValid() || isSubmitting} className={styles.btnPri}>
                     {isSubmitting ? 'Envoi...' : 'Terminer'}
                   </button>
                ) : (
                   <button type="button" onClick={nextStep} disabled={!isStepValid()} className={styles.btnPri}>Suivant</button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <div className={styles.success}>
             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
               <h2 className={styles.successTitle}>Message Reçu.</h2>
               <p className={styles.successDesc}>Merci pour votre contribution au futur du CMO48.</p>
               <div className={styles.checkMark}>✓</div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CinematicBackground>
  );
}