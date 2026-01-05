import WizardForm from "../components/WizardForm";

export default function Home() {
  return (
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#f5f5f5" 
    }}>
      <WizardForm />
    </main>
  );
}