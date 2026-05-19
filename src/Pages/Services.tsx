import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { ServiceFeatureSection } from "./components/services/ServiceFeatureSection";
import { FormattingFeatureSection } from "./components/services/FormattingFeatureSection";
import { WebDesignFeatureSection } from "./components/services/WebDesignFeatureSection";
import { PublishingGuidanceSection } from "./components/services/PublishingGuidanceSection";
import { RoyalServicesProcessSection } from "./components/services/RoyalServicesProcessSection";
import { useGetServicesCmsQuery } from "../redux/Slices/cmsApi";
import { Loader } from "../lib/Loader";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const Services = () => {
  const location = useLocation();

  const { data, isLoading, isError, error } = useGetServicesCmsQuery();

  const servicesCmsData = data?.data;
  const hero = servicesCmsData?.hero_section;
  const services = servicesCmsData?.services || [];

  const bookEditing = services.find((item) => item.id === 1);
  const formatting = services.find((item) => item.id === 2);
  const webDesign = services.find((item) => item.id === 3);
  const publishing = services.find((item) => item.id === 4);

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
    }, 160);

    return () => window.clearTimeout(timer);
  }, [location.hash, services.length]);

  if (isLoading) {
    return <Loader title="Loading services..." fullScreen />;
  }

  if (isError) {
    console.log("Services CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load services content.
      </div>
    );
  }

  if (!servicesCmsData || !hero) {
    return null;
  }

  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={getCmsAssetUrl(hero.background_image)}
        logoimg={logoimg}
        title={hero.title}
        description={hero.subtitle}
      />

      <div id="book" className="scroll-mt-[110px]">
        <ServiceFeatureSection category={bookEditing} />
      </div>

      <div id="formatting" className="scroll-mt-[110px]">
        <FormattingFeatureSection category={formatting} />
      </div>

      <div id="web-design" className="scroll-mt-[110px]">
        <WebDesignFeatureSection category={webDesign} />
      </div>

      <div id="publishing" className="scroll-mt-[110px]">
        <PublishingGuidanceSection category={publishing} />
      </div>

      <div id="process" className="scroll-mt-[110px]">
        <RoyalServicesProcessSection
          engageSection={servicesCmsData.engage_section}
          subFooterSection={servicesCmsData.sub_footer_section}
        />
      </div>
    </div>
  );
};

export default Services;