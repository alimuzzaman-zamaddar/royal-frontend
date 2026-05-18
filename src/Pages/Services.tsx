import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { CommonBanner } from "./components/CommonBanner";
import Servicesimg from "../assets/lineage/services.png";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { ServiceFeatureSection } from "./components/services/ServiceFeatureSection";
import { FormattingFeatureSection } from "./components/services/FormattingFeatureSection";
import { WebDesignFeatureSection } from "./components/services/WebDesignFeatureSection";
import { PublishingGuidanceSection } from "./components/services/PublishingGuidanceSection";
import { RoyalServicesProcessSection } from "./components/services/RoyalServicesProcessSection";

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");

    const timer = window.setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (!section) return;

      const headerOffset = 110;
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={Servicesimg}
        logoimg={logoimg}
        title="THE ROYAL SERVICE"
        description="We build the throne so you can wear the crown"
      />

      <div id="book" className="scroll-mt-[110px]">
        <ServiceFeatureSection />
      </div>

      <div id="formatting" className="scroll-mt-[110px]">
        <FormattingFeatureSection />
      </div>

      <div id="web-design" className="scroll-mt-[110px]">
        <WebDesignFeatureSection />
      </div>

      <div id="publishing" className="scroll-mt-[110px]">
        <PublishingGuidanceSection />
      </div>

     <div id="process" className="scroll-mt-[110px]">
        <RoyalServicesProcessSection />
      </div>
    </div>
  );
};

export default Services;