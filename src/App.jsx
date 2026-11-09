import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import TrustBar from "./components/TrustBar/TrustBar.jsx";
import Uncover from "./components/Uncover/Uncover.jsx";
import NotThisEconomy from "./components/NotThisEconomy/NotThisEconomy.jsx";
import ChecklistSection from "./components/ChecklistSection/ChecklistSection.jsx";
import FourStages from "./components/FourStages/FourStages.jsx";
import Problem97 from "./components/Problem97/Problem97.jsx";
import ProofTable from "./components/ProofTable/ProofTable.jsx";
import Calculator from "./components/Calculator/Calculator.jsx";
import FourAreas from "./components/FourAreas/FourAreas.jsx";
import Workshop from "./components/Workshop/Workshop.jsx";
import MeetNerd from "./components/MeetNerd/MeetNerd.jsx";
import BioIntro from "./components/BioIntro/BioIntro.jsx";
import BioJourney from "./components/BioJourney/BioJourney.jsx";
import BioPause from "./components/BioPause/BioPause.jsx";
import BioBirth from "./components/BioBirth/BioBirth.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Curious from "./components/Curious/Curious.jsx";
import Footer from "./components/Footer/Footer.jsx";
import useReveal from "./hooks/useReveal.js";

export default function App() {
  // Fades in the content inside each section as it scrolls into view.
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <NotThisEconomy />
        <Uncover />
        <ChecklistSection />
        <Problem97 />
        <FourStages />
        <ProofTable />
        <Calculator />
        <FourAreas />
        <Workshop />
        <MeetNerd />
        <BioIntro />
        <BioJourney />
        <BioPause />
        <BioBirth />
        <Testimonials />
        <Curious />
        <Footer />
      </main>
    </>
  );
}
