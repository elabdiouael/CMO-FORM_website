// src/app/page.tsx
import WizardForm from "../components/WizardForm";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-space-grotesk)",
      // L'perspective darouriya l'effet 3D
      perspective: "1500px",
    }}>
      <WizardForm />
    </main>
  );
}