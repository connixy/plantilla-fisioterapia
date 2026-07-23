import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileStickyButton from "../components/MobileStickyButton";
import FloatingButtons from "../components/FloatingButtons";
import HeroSection from "../components/sections/HeroSection";
import TratamientosSection from "../components/sections/TratamientosSection";
import AnatomiaSection from "../components/sections/AnatomiaSection";
import EquipoSection from "../components/sections/EquipoSection";
import CasosRealesSection from "../components/sections/CasosRealesSection";
import ResenasSection from "../components/sections/ResenasSection";
import DatosSection from "../components/sections/DatosSection";
import SobreNosotrosSection from "../components/sections/SobreNosotrosSection";
import ContactoSection from "../components/sections/ContactoSection";
import FinalCTASection from "../components/sections/FinalCTASection";
import InstalacionesSection from "../components/sections/InstalacionesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TratamientosSection />
      <AnatomiaSection />
      <EquipoSection />
      <CasosRealesSection />
      <InstalacionesSection />
      <ResenasSection />
      <DatosSection />
      <SobreNosotrosSection />
      <ContactoSection />
      <FinalCTASection />
      <Footer />
      <MobileStickyButton />
      <FloatingButtons />
    </div>
  );
};

export default Index;
