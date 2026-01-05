export type FieldType = "text" | "email" | "select" | "radio" | "textarea";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // Hada optionnel, ghir l select w radio
}

export interface Slide {
  id: number;
  title: string;
  description: string;
  fields: Field[];
}

export const wizardConfig: Slide[] = [
  {
    id: 1,
    title: "Bda m3ana l-aventure",
    description: "3tina l-ma3loumat l-assasiya dyalek.",
    fields: [
      { name: "fullName", label: "Smiya l-kamla", type: "text", placeholder: "Ex: Ahmed Alami" },
      { name: "email", label: "Email dyalek", type: "email", placeholder: "ahmed@example.com" }
    ]
  },
  {
    id: 2,
    title: "Chno l-projet dyalek?",
    description: "Gol lina chmen service baghi.",
    fields: [
      { 
        name: "serviceType", 
        label: "No3 l-khdma", 
        type: "select", 
        options: ["Web Development", "Design UI/UX", "Marketing", "Autre"] 
      },
      { 
        name: "budget", 
        label: "Budget ta9ribi", 
        type: "radio", 
        options: ["< 5000 DH", "5000 - 10000 DH", "+ 10000 DH"] 
      }
    ]
  },
  {
    id: 3,
    title: "Akhir haja",
    description: "Chi message awla details khrin?",
    fields: [
      { name: "details", label: "Details", type: "textarea", placeholder: "kteb hna..." }
    ]
  }
];