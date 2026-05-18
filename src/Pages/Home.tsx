/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hero } from "./components/homepage/Hero";
import { LineageSection } from "./components/homepage/LineageSection";
import { RoyalLibrarySection } from "./components/homepage/RoyalLibrarySection";
import { RoyalExchangeSection } from "./components/homepage/RoyalExchangeSection";
import { RoyalServicesSection } from "./components/homepage/RoyalServicesSection";
import { EarthIsOursSection } from "./components/homepage/EarthIsOursSection";
import { NewsletterPopup } from "./components/homepage/NewsletterPopup";
import { useGetHomeCmsQuery } from "../redux/Slices/cmsApi";
import { Loader } from "../lib/Loader";

const Home = () => {
  const { data, isLoading, isError, error } = useGetHomeCmsQuery();

  const homeCmsData = data?.data as any;

  if (isLoading) {
    return <Loader title="Loading homepage..." fullScreen />;
  }

  if (isError) {
    console.log("Home CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load homepage content.
      </div>
    );
  }

  console.log("Home CMS data:", homeCmsData);

  return (
    <div>
      <Hero hero={homeCmsData?.hero_section} />
      <LineageSection lineage={homeCmsData?.our_ancestral_lineage_section} />
      <RoyalLibrarySection library={homeCmsData?.library_section} />
      <RoyalExchangeSection
        crown={homeCmsData?.crown_section}
        banner={homeCmsData?.banner_section}
      />
      <RoyalServicesSection servicesSection={homeCmsData?.services_section} />
      <EarthIsOursSection subFooter={homeCmsData?.sub_footer_section} />
      <NewsletterPopup />
    </div>
  );
};

export default Home;
