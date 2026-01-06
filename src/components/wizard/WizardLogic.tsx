"use client";

import { useState } from "react";
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

  const slide = wizardConfig[step];
  const total = wizardConfig.length;

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    if(!slide) return false;
    return slide.fields.every(f => {
      if(!f.required) return true;
      return formData[f.name] && formData[f.name].toString().trim() !== "";
    });
  };

  const nextStep = () => { if(step < total) setStep(s => s + 1); };
  const prevStep = () => { if(step > 0) setStep(s => s - 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isStepValid()) return;
    setIsSubmitting(true);
    // Simulation d'envoi (Replace with fetch logic)
    setTimeout(() => { setIsSubmitting(false); nextStep(); }, 1500);
  };

  // Animation settings
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <CinematicBackground>
      <ProgressBar current={step} total={total} />

      <AnimatePresence mode="wait">
        {step < total ? (
          <motion.div 
            key={step}
            variants={variants}
            initial="initial" animate="animate" exit="exit"
            className={styles.slideContainer}
          >
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.desc}>{slide.description}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fields}>
                {slide.fields.map(field => (
                  <div key={field.name} className={styles.fieldBlock}>
                    {field.type === 'radio' ? (
                      <div className={styles.radioGrid}>
                        {field.options?.map(opt => (
                          <RadioCard 
                            key={opt} 
                            label={opt} 
                            selected={formData[field.name] === opt}
                            onClick={() => {
                                handleChange(field.name, opt);
                                // Auto advance if single question
                                if(slide.fields.length === 1) setTimeout(nextStep, 300);
                            }}
                          />
                        ))}
                      </div>
                    ) : field.type === 'select' ? (
                        <div className={styles.selectWrapper}>
                            <label>{field.label}</label>
                            <select 
                                value={formData[field.name] || ''} 
                                onChange={(e) => handleChange(field.name, e.target.value)}
                            >
                                <option value="" disabled>Select option...</option>
                                {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
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
                <button type="button" onClick={prevStep} disabled={step === 0} className={styles.btnSec}>Back</button>
                {step === total - 1 ? (
                   <button type="submit" disabled={!isStepValid() || isSubmitting} className={styles.btnPri}>
                     {isSubmitting ? 'Sending...' : 'Finish'}
                   </button>
                ) : (
                   <button type="button" onClick={nextStep} disabled={!isStepValid()} className={styles.btnPri}>Next</button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <div className={styles.success}>
             <h2>Transmission Complete</h2>
             <p>Welcome to the future.</p>
          </div>
        )}
      </AnimatePresence>
    </CinematicBackground>
  );
}