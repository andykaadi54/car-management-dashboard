import Footer from "../../components/Footer";
import GettingStarted from "../../components/GettingStarted/";
import OurService from "../../components/OurService/";
import Testimonial from "../../components/Testimonial/";
import WhyUs from "../../components/WhyUs/";
import MainSection from "../../components/MainSection/";

const LandingPage = () => {
  return (
    <>
      <MainSection />
      <OurService />
      <WhyUs />
      <Testimonial />
      <GettingStarted />
      <Footer />
    </>
  );
};
export default LandingPage;
