import HeroSection from "../sections/ideas/HeroSection";
import ListSection from "../sections/ideas/ListSection";
import HeroImage from "../assets/ideasHero.jpg";

const IdeasPage = () => {
  return (
    <>
      <HeroSection image={HeroImage} />
      <ListSection />
    </>
  );
};

export default IdeasPage;
