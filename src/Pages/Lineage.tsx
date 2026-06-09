import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { LegacyCardsSection } from "./components/lineage/LegacyCardsSection";
import { ArchiveStatementSection } from "./components/lineage/ArchiveStatementSection";
import { LineageCtaSection } from "./components/lineage/LineageCtaSection";
import { useGetLineageCmsQuery } from "../redux/Slices/cmsApi";
import { Loader } from "../lib/Loader";
import SEO from "../lib/SEO";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const Lineage = () => {
  const { data, isLoading, isError, error } = useGetLineageCmsQuery();

  const lineageCmsData = data?.data;
  const hero = lineageCmsData?.hero_section;
  const lineageServices = lineageCmsData?.lineage_services_section;
  const mainSection = lineageCmsData?.main_section;
  const subFooterSection = lineageCmsData?.sub_footer_section;

  const heroDescription = hero?.items?.[0]?.title || "";
  const heroSubDescription = hero?.items?.[1]?.title || "";

  if (isLoading) {
    return <Loader title="Loading lineage..." fullScreen />;
  }

  if (isError) {
    console.log("Lineage CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load lineage content.
      </div>
    );
  }

  if (!lineageCmsData || !hero) {
    return null;
  }

  return (
    <div>

            <SEO
        title="Royal Exchange Lineage | Legacy, Purpose & Vision"
        description="Discover the lineage of Royal Exchange, where legacy, purpose, and vision inspire a new generation through publishing, fashion, and leadership"
      />
      <CommonBanner
        id="lineage-hero"
        backgroundImage={getCmsAssetUrl(hero.background_image)}
        logoimg={logoimg}
        title={hero.title}
        description={heroDescription}
        subDescription={heroSubDescription}
      />

      <LegacyCardsSection lineageServices={lineageServices} />

      <ArchiveStatementSection mainSection={mainSection} />

      <LineageCtaSection subFooterSection={subFooterSection} />
    </div>
  );
};

export default Lineage;