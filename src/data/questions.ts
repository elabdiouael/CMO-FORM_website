// src/data/questions.ts
export type FieldType = "text" | "email" | "select" | "radio" | "textarea";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export interface Slide {
  id: number;
  title: string;
  description: string;
  fields: Field[];
}

export const wizardConfig: Slide[] = [
  // --- 1. Infos Personnelles ---
  {
    id: 1,
    title: "Identité & Profil",
    description: "Net3erfo 3lik chwiya 9bel ma nebda.",
    fields: [
      { name: "email", label: "Adresse e-mail", type: "email", placeholder: "Ex: nom@gmail.com" },
      { name: "fullName", label: "Nom complet", type: "text", placeholder: "Smiya w lknya" },
      { 
        name: "age", 
        label: "Âge", 
        type: "select", 
        options: ["Moins de 18 ans", "18–22 ans", "23–26 ans", "27 ans et plus"] 
      },
      { 
        name: "status", 
        label: "Statut actuel", 
        type: "select", 
        options: ["Étudiant(e)", "Jeune diplômé(e)", "Professionnel(le)", "Entrepreneur(e)", "Autre"] 
      },
      { 
        name: "cmo_relation", 
        label: "Votre lien avec le CMO48", 
        type: "radio", 
        options: ["Membre actif", "Ancien membre", "Intéressé(e)", "Partenaire potentiel"] 
      }
    ]
  },

  // --- 2. Vision 2026 ---
  {
    id: 2,
    title: "Vision CMO 2026",
    description: "Kifach katchouf l mosta9bal dyal le club?",
    fields: [
      { 
        name: "vision_priority", 
        label: "Le CMO48 doit prioritairement être :", 
        type: "radio", 
        options: [
          "Club de formation pro", 
          "Incubateur de projets", 
          "Réseau de talents", 
          "Acteur d’impact social", 
          "Mix équilibré"
        ] 
      },
      { 
        name: "vision_clarity", 
        label: "Clarté de la vision actuelle", 
        type: "radio", 
        options: ["Très claire", "Claire", "Moyennement claire", "Peu claire"] 
      }
    ]
  },

  // --- 3. Stratégie (Vote) ---
  {
    id: 3,
    title: "Stratégie & Priorités",
    description: "Chno hiya l'priorité numéro 1 3ndk?",
    fields: [
      { 
        name: "strategic_priority", 
        label: "Priorité stratégique principale", 
        type: "select", 
        options: [
          "Formations pratiques/certifiantes",
          "Contenus en français",
          "Accompagnement projets",
          "Hackathons",
          "Visites d’entreprises",
          "Événements Tech/Business",
          "Visibilité & Image",
          "Activités sociales",
          "Pôle juridique (Law)"
        ] 
      }
    ]
  },

  // --- 4. Contenu en Français ---
  {
    id: 4,
    title: "Contenu en Français",
    description: "Wach interessé b content b lfrançais?",
    fields: [
      { 
        name: "fr_interest", 
        label: "Niveau d’intérêt", 
        type: "radio", 
        options: ["Très intéressé(e)", "Intéressé(e)", "Peu intéressé(e)", "Pas intéressé(e)"] 
      },
      { 
        name: "fr_domain", 
        label: "Domaine prioritaire", 
        type: "select", 
        options: ["Communication pro", "Marketing & digital", "Business & entrep.", "Soft skills", "Autre"] 
      },
      { 
        name: "fr_format", 
        label: "Format préféré", 
        type: "radio", 
        options: ["Présentiel", "En ligne", "Hybride"] 
      }
    ]
  },

  // --- 5. Formations ---
  {
    id: 5,
    title: "Formations & Skills",
    description: "Fach baghi tdevelopa?",
    fields: [
      { 
        name: "training_topic", 
        label: "Sujet prioritaire", 
        type: "select", 
        options: [
          "Marketing digital & SEO",
          "IA & No-code",
          "Entrepreneuriat",
          "Design & Content",
          "Gestion de projet",
          "Finance & Business Model",
          "Dev personnel"
        ] 
      },
      { 
        name: "training_level", 
        label: "Niveau souhaité", 
        type: "radio", 
        options: ["Débutant", "Intermédiaire", "Avancé"] 
      }
    ]
  },

  // --- 6. Porteurs de projets ---
  {
    id: 6,
    title: "Projets & Idées",
    description: "Wach 3ndk chi projet baghi tlncih?",
    fields: [
      { 
        name: "is_project_lead", 
        label: "Devenir porteur de projet ?", 
        type: "radio", 
        options: ["Oui", "Non", "Peut-être"] 
      },
      { 
        name: "project_domain", 
        label: "Si oui, quel domaine ?", 
        type: "select", 
        options: ["Digital", "Éducation", "Santé", "Social", "Business", "Autre (N/A)"] 
      },
      {
        name: "project_needs",
        label: "Besoin principal",
        type: "select",
        options: ["Mentorat", "Formation", "Mise en réseau", "Partenaires", "Hackathons", "N/A"]
      }
    ]
  },

  // --- 7. Hackathons ---
  {
    id: 7,
    title: "Hackathons",
    description: "Competition w Challenge.",
    fields: [
      { 
        name: "hackathon_interest", 
        label: "Intérêt pour les hackathons", 
        type: "radio", 
        options: ["Très élevé", "Moyen", "Faible", "Aucun"] 
      },
      { 
        name: "hackathon_goal", 
        label: "Votre objectif principal", 
        type: "select", 
        options: ["Participer", "Coaching/Accompagnement", "Organiser", "Valoriser les prix"] 
      }
    ]
  },

  // --- 8. Pôle Juridique ---
  {
    id: 8,
    title: "Pôle Juridique (Law)",
    description: "Wach had l pôle mzyan lik?",
    fields: [
      { 
        name: "law_relevance", 
        label: "Pertinence du pôle", 
        type: "radio", 
        options: ["Très pertinente", "Pertinente", "Peu pertinente", "Inutile"] 
      },
      { 
        name: "law_topic", 
        label: "Sujet intéressant", 
        type: "select", 
        options: ["Droit des entreprises", "Statuts & Création", "Propriété intellectuelle", "Droit du travail", "Réglementation digitale"] 
      }
    ]
  },

  // --- 9. Visibilité ---
  {
    id: 9,
    title: "Communication & Image",
    description: "Kifach n-amélioriw l'image dyalna?",
    fields: [
      { 
        name: "com_channel", 
        label: "Canal à renforcer", 
        type: "radio", 
        options: ["Instagram", "TikTok", "LinkedIn", "Événements physiques", "Médias"] 
      },
      { 
        name: "com_rating", 
        label: "Note visibilité (1-5)", 
        type: "radio", 
        options: ["1 - Faible", "2", "3", "4", "5 - Top"] 
      },
      { 
        name: "com_suggestions", 
        label: "Suggestions d’amélioration", 
        type: "textarea",
        placeholder: "Votre avis compte..."
      }
    ]
  },

  // --- 10. Social ---
  {
    id: 10,
    title: "Activités Sociales",
    description: "L'impact social dyal le club.",
    fields: [
      { 
        name: "social_type", 
        label: "Type d'activité", 
        type: "select", 
        options: ["Actions solidaires", "Sensibilisation locale", "Volontariat", "Team building"] 
      },
      { 
        name: "social_freq", 
        label: "Fréquence idéale", 
        type: "radio", 
        options: ["Mensuelle", "Trimestrielle", "Ponctuelle"] 
      }
    ]
  },

  // --- 11 & 12. Idées & Feedback ---
  {
    id: 11,
    title: "Idées & Feedback",
    description: "L'espace dyalk l-libre.",
    fields: [
      { 
        name: "new_ideas", 
        label: "Nouvelles idées pour 2026", 
        type: "textarea",
        placeholder: "Proposez vos idées ici..."
      },
      { 
        name: "general_feedback", 
        label: "Recommandations générales", 
        type: "textarea",
        placeholder: "Critiques, attentes, propositions..."
      }
    ]
  },

  // --- 13. Recruitment & Future ---
  {
    id: 12,
    title: "Implication & Team",
    description: "Bghiti tkon membre actif?",
    fields: [
      { 
        name: "future_implication", 
        label: "Implication active en 2026 ?", 
        type: "radio", 
        options: ["Oui", "Non", "Selon les projets"] 
      },
      { 
        name: "join_team", 
        label: "Rejoindre la TEAM CMO ?", 
        type: "radio", 
        options: ["Oui", "Non"] 
      },
      { 
        name: "team_role", 
        label: "Si oui, quel pôle ?", 
        type: "select", 
        options: ["MANAGEMENT", "MEDIA", "SOCIAL MEDIA", "EDITING", "RELATIONSHIP", "MARKETING", "EVENT", "FORMATION", "TECH / DIGITAL", "N/A"] 
      },
      { 
        name: "contact_info", 
        label: "Numéro ou Contact (Facultatif)", 
        type: "text", 
        placeholder: "+212..." 
      }
    ]
  }
];