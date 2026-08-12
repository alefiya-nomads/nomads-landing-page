import Hero from "./components/Hero/Hero.jsx";
import TrustBar from "./components/TrustBar/TrustBar.jsx";
import NotThisEconomy from "./components/NotThisEconomy/NotThisEconomy.jsx";
import ChecklistSection from "./components/ChecklistSection/ChecklistSection.jsx";
import Mechanism from "./components/Mechanism/Mechanism.jsx";
import Problem97 from "./components/Problem97/Problem97.jsx";
import ProofIntro from "./components/ProofIntro/ProofIntro.jsx";
import ProofTable from "./components/ProofTable/ProofTable.jsx";
import Calculator from "./components/Calculator/Calculator.jsx";
import FourAreas from "./components/FourAreas/FourAreas.jsx";
import Workshop from "./components/Workshop/Workshop.jsx";
import MeetNerd from "./components/MeetNerd/MeetNerd.jsx";
import Founder from "./components/Founder/Founder.jsx";
import SystemBorn from "./components/SystemBorn/SystemBorn.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Curious from "./components/Curious/Curious.jsx";
import Footer from "./components/Footer/Footer.jsx";
import useReveal from "./hooks/useReveal.js";

export default function App() {
  // Fades in the content inside each section as it scrolls into view.
  useReveal();

  return (
    <main>
      <Hero />
      <TrustBar />
      <NotThisEconomy />
      <ChecklistSection />
      <Mechanism />
      <Problem97 />
      <ProofIntro />
      <ProofTable />
      <Calculator />
      <FourAreas />
      <Workshop />
      <MeetNerd />
      <Founder />
      <SystemBorn />
      <Testimonials />
      <Curious />
      <Footer />
    </main>
  );
}
