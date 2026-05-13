import { CommonBanner } from "./components/CommonBanner";
import Servicesimg from "../assets/lineage/services.png";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { ServiceFeatureSection } from "./components/services/ServiceFeatureSection";
import { FormattingFeatureSection } from "./components/services/FormattingFeatureSection";
import { WebDesignFeatureSection } from "./components/services/WebDesignFeatureSection";
import { PublishingGuidanceSection } from "./components/services/PublishingGuidanceSection";
import { RoyalServicesProcessSection } from "./components/services/RoyalServicesProcessSection";

const Services = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={Servicesimg}
        logoimg={logoimg}
        title="THE ROYAL SERVICE"
        description="We build the throne so you can wear the crown"
      />
      <ServiceFeatureSection />
      <FormattingFeatureSection />
      <WebDesignFeatureSection />
      <PublishingGuidanceSection />
      <RoyalServicesProcessSection />
    </div>
  );
};

export default Services;
