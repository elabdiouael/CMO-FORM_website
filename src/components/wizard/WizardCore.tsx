// src/components/wizard/WizardCore.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wizardConfig } from "../../data/questions";
import GalaxyBackground from "../layout/GalaxyBackground";
import HoloCard from "../layout/HoloCard";
import TechInput from "../ui/TechInput";
import CyberSelect from "../ui/CyberSelect";
import styles from "./WizardCore.module.scss";

const CARD_VARIANTS = ['holo', 'neon', 'crimson', 'void', 'synthwave'] as const;

export default function WizardCore() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [started, setStarted] = useState(false);
  const [sending, setSending] = useState(false);

  const currentVariant = CARD_VARIANTS[step % CARD_VARIANTS.length];
  const currentSlide = wizardConfig[step];
  
  const handleChange = (name: string, val: string) => setFormData(p => ({ ...p, [name]: val }));
  
  const isValid = () => {
    if(!currentSlide) return false;
    return currentSlide.fields.every(f => !f.required || (formData[f.name] && formData[f.name].trim() !== ""));
  };

  const next = () => step < wizardConfig.length && setStep(s => s + 1);
  const prev = () => step > 0 && setStep(s => s - 1);

  // --- WEB3FORMS SUBMISSION LOGIC ---
  const handleSubmit = async () => {
    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          // 👇 Access Key dyalk mn screenshot
          access_key: "b6e62b58-a801-4d30-b005-f141f22dbbb9",
          ...formData,
          subject: "Nouveau Formulaire CMO 2026", // Sujet d l-email
          from_name: "CMO Website Form"
        })
      });

      const result = await response.json();

      if (result.success) {
        setTimeout(() => { 
          setSending(false); 
          next(); 
        }, 1500);
      } else {
        console.error("Web3Forms Error:", result);
        alert("Erreur: " + (result.message || "Impossible d'envoyer."));
        setSending(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion.");
      setSending(false);
    }
  };

  if(!started) {
    return (
      <GalaxyBackground>
        <div className={styles.intro}>
           <h1 className={styles.glitch} data-text="PROJECT 2080">PROJECT 2080</h1>
           <p>SYSTEM READY. INITIALIZE PROTOCOL.</p>
           <button onClick={() => setStarted(true)} className={styles.btnStart}>
             INITIALIZE
           </button>
        </div>
      </GalaxyBackground>
    );
  }

  return (
    <GalaxyBackground>
      <HoloCard variant={currentVariant}>
        <div className={styles.progress}>
           <div className={styles.bar} style={{ width: `${((step + 1)/wizardConfig.length)*100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {step < wizardConfig.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className={styles.slide}
            >
              <div className={styles.header}>
                 <span className={styles.stepNum}>0{step + 1} // {wizardConfig.length}</span>
                 <h2>{currentSlide.title}</h2>
                 <p>{currentSlide.description}</p>
              </div>

              <div className={styles.form}>
                {currentSlide.fields.map(field => (
                  <div key={field.name}>
                    {
                    field.type === 'select' ? (
                      <CyberSelect 
                        label={field.label}
                        options={field.options || []}
                        value={formData[field.name] || ''}
                        onChange={(val) => handleChange(field.name, val)}
                      />
                    ) : 
                    field.type === 'radio' ? (
                      <div className={styles.radioGroup}>
                         <label className={styles.radioLabel}>{field.label}</label>
                         <div className={styles.grid}>
                            {field.options?.map(opt => (
                               <div 
                                 key={opt} 
                                 className={`${styles.radioCard} ${formData[field.name] === opt ? styles.selected : ''}`}
                                 onClick={() => {
                                    handleChange(field.name, opt);
                                    if(currentSlide.fields.length === 1 && !sending) {
                                      setTimeout(next, 400);
                                    }
                                 }}
                               >
                                  {opt}
                               </div>
                            ))}
                         </div>
                      </div>
                    ) : (
                      <TechInput 
                        label={field.label}
                        name={field.name}
                        multiline={field.type === 'textarea'}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                 <button onClick={prev} disabled={step === 0} className={styles.btnSec}>BACK</button>
                 {step === wizardConfig.length - 1 ? (
                    <button onClick={handleSubmit} disabled={!isValid() || sending} className={styles.btnPri}>
                      {sending ? 'UPLOADING...' : 'TRANSMIT DATA'}
                    </button>
                 ) : (
                    <button onClick={next} disabled={!isValid()} className={styles.btnPri}>NEXT</button>
                 )}
              </div>
            </motion.div>
          ) : (
            <div className={styles.success}>
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                 <h1>TRANSMISSION COMPLETE</h1>
                 <p>Check your email for confirmation.</p>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </HoloCard>
    </GalaxyBackground>
  );
}