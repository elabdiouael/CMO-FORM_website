# Next.js Interactive Wizard Form 🚀

A modern, gamified multi-step form (Wizard) built with **Next.js (App Router)**. Designed to replace long, boring vertical forms with an engaging, interactive experience to boost conversion rates.

## ✨ Features

- **Multi-step Architecture:** Breaks down complex data collection into bite-sized slides.
- **Smooth Animations:** Powered by **Framer Motion** for seamless slide-in/slide-out transitions.
- **Robust Validation:** Prevents users from skipping steps or submitting empty data.
- **Dynamic Fields:** Fully configurable via a JSON-like data file (Text, Select, Radio, Textarea).
- **Serverless Backend:** Uses **FormSubmit.co** for email delivery (no database or backend code required).
- **Clean Styling:** Scoped styling using **SCSS Modules**.
- **TypeScript:** Type-safe implementation for better maintainability.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS (Sass) Modules
- **Animation:** Framer Motion
- **Form Handling:** React State & FormSubmit.co API

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone & Install

```bash
# Install dependencies
npm install
# or
yarn install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚙️ Configuration

### 1. Editing Questions

You don't need to touch the component code to add or remove questions. Just edit the configuration file:
`src/data/questions.ts`

```typescript
export const wizardConfig = [
  {
    id: 1,
    title: "Step Title",
    description: "Step description...",
    fields: [
      { name: "fieldName", label: "Label", type: "text", placeholder: "..." },
    ],
  },
  // Add more steps here...
];
```

### 2. Setting up Email (Backend)

To receive submissions to your email:

1. Go to `src/components/WizardForm/index.tsx`.
2. Find the `fetch` URL in the `handleSubmit` function.
3. Replace the random string with your own **FormSubmit** ID or your email address.

```typescript
// src/components/WizardForm/index.tsx
const response = await fetch("https://formsubmit.co/ajax/YOUR_ID_OR_EMAIL", { ... });
```

_Note: If using an email address, you must activate it by clicking the link sent to your inbox after the first submission._

## 📁 Project Structure

```bash
src/
├── app/
│   ├── globals.css      # Global resets
│   └── page.tsx         # Main entry point
├── components/
│   └── WizardForm/
│       ├── index.tsx    # Main Logic (State, Validation, Submission)
│       └── WizardForm.module.scss # Scoped Styles
└── data/
    └── questions.ts     # Configuration file (Questions Array)
```

## 🎨 Customization

- **Colors & Fonts:** Edit `src/components/WizardForm/WizardForm.module.scss` to change the color scheme (currently set to Blue/White).
- **Animations:** Modify `slideVariants` in `index.tsx` to change how slides enter and exit.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

---

Built by AFILAL Iliass with ❤️ using Next.js
