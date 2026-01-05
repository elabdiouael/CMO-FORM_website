// src/components/WizardForm/index.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WizardForm.module.scss";
import { wizardConfig } from "../../data/questions";

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  // Hna goulna l TS bli formData hiya objet fih keys strings w values strings
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = wizardConfig.length;
  const currentSlide = wizardConfig[currentStep];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction bach n-verifiw wach l-step actuelle 3amra
  const isStepValid = () => {
    return currentSlide.fields.every((field) => {
      const value = formData[field.name];
      return value !== undefined && value !== null && value.trim() !== "";
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // <--- HADI DAROURIYA: Kat-7bes l-form bach may-tfa3elch

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

   const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ila kan l-bouton howa Enter W machi textarea (bach nkheliw l-user ynaqqez ster f details)
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
      e.preventDefault(); // Bloqui l-submit
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep !== totalSteps - 1) return; 
    
    if (!isStepValid()) {
      alert("3afak 3emmer l-ma3loumat 9bel ma tsifet.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Remplacer had l-URL b dyalek mn FormSubmit.co
      const response = await fetch(
        "https://formsubmit.co/ajax/edfbd1ce307b760f636d77ff2f617eb6",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Wselna l-message dyalek! Merci.");
      } else {
        alert("W9e3 chi mochkil, 3awd jarreb.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className={styles.slideContent}
          >
            <h2>{currentSlide.title}</h2>
            <p>{currentSlide.description}</p>

            <div className={styles.fieldsGroup}>
              {currentSlide.fields.map((field) => (
                <div key={field.name} className={styles.inputWrapper}>
                  <label>{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      onChange={handleChange}
                      value={formData[field.name] || ""}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      onChange={handleChange}
                      value={formData[field.name] || ""}
                    >
                      <option value="">Ikhtar...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "radio" ? (
                    <div className={styles.radioGroup}>
                      {field.options?.map((opt) => (
                        <label key={opt} className={styles.radioLabel}>
                          <input
                            type="radio"
                            name={field.name}
                            value={opt}
                            onChange={handleChange}
                            checked={formData[field.name] === opt}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      onChange={handleChange}
                      value={formData[field.name] || ""}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.actions}>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className={styles.btnSecondary}
            >
              Rje3
            </button>
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={(e) => handleNext(e)} // <--- Dwez 'e' hna
              className={styles.btnPrimary}
              disabled={!isStepValid()}
              style={{
                opacity: isStepValid() ? 1 : 0.5,
                cursor: isStepValid() ? "pointer" : "not-allowed",
              }}
            >
              Zid l-goudam
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btnSubmit}
            >
              {isSubmitting ? "Kay-seffet..." : "Sifet l-Form"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
