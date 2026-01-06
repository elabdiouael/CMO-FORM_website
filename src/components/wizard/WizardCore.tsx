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

// Les styles dyal les cartes li kaytbedlo kola step
const CARD_VARIANTS = ['holo', 'neon', 'crimson', 'void', 'synthwave'] as const;

export default function WizardCore() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [started, setStarted] = useState(false);
  const [sending, setSending] = useState(false);

  // Logic dyal Variant (Holo -> Neon -> Crimson...)
  const currentVariant = CARD_VARIANTS[step % CARD_VARIANTS.length];
  const currentSlide = wizardConfig[step];
  
  // Handlers
  const handleChange = (name: string, val: string) => setFormData(p => ({ ...p, [name]: val }));
  
  const isValid = () => {
    if(!currentSlide) return false;
    return currentSlide.fields.every(f => !f.required || (formData[f.name] && formData[f.name].trim() !== ""));
  };

  const next = () => step < wizardConfig.length && setStep(s => s + 1);
  const prev = () => step > 0 && setStep(s => s - 1);

  // --- PAGECLIP INTEGRATION ---
  const handleSubmit = async () => {
    setSending(true);
    
    // 👇 Lien dyal Pageclip mn screenshot dyalk
    const PAGECLIP_URL = "https://send.pageclip.co/cMmvHtrwAIU4nrjwl8Y5G8k7Eg34F89f";

    try {
      const response = await fetch(PAGECLIP_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Parfois Pageclip kaybtghi had header bach ya3ref rah JSON
          "X-REQ-METHOD": "json" 
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toLocaleString()
        })
      });

      if (response.ok) {
        // Success Animation Delay
        setTimeout(() => { 
          setSending(false); 
          next(); 
        }, 1500);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion. Jreb mrra khra.");
      setSending(false);
    }
  };

  // --- 1. INTRO SCREEN ---
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

  // --- 2. MAIN WIZARD ---
  return (
    <GalaxyBackground>
      {/* Hna kan-passiw variant bach tbdel l-couleur */}
      <HoloCard variant={currentVariant}>
        
        {/* Progress Bar */}
        <div className={styles.progress}>
           <div className={styles.bar} style={{ width: `${((step + 1)/wizardConfig.length)*100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {step < wizardConfig.length ? (
            <motion.div
              key={step}
              // Animation d'entrée : Flou -> Net + Glissement
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
                    // --- SELECT CUSTOM ---
                    field.type === 'select' ? (
                      <CyberSelect 
                        label={field.label}
                        options={field.options || []}
                        value={formData[field.name] || ''}
                        onChange={(val) => handleChange(field.name, val)}
                      />
                    ) : 
                    // --- RADIO CUSTOM ---
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
                                    // Auto-next ghir ila kan soal wa7d
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
                    // --- INPUTS TEXT/EMAIL ---
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
            // --- SUCCESS SCREEN ---
            <div className={styles.success}>
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
               >
                 <h1>TRANSMISSION COMPLETE</h1>
                 <p>DATA SECURED IN THE CLOUD.</p>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </HoloCard>
    </GalaxyBackground>
  );
}