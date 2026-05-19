import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { FounderStorySection } from "./components/royalexchange/FounderStorySection";
import { useGetRoyalExchangeCmsQuery } from "../redux/Slices/cmsApi";
import { Loader } from "../lib/Loader";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const RoyalExchange = () => {
  const { data, isLoading, isError, error } = useGetRoyalExchangeCmsQuery();

  const royalExchangeData = data?.data;
  const hero = royalExchangeData?.hero_section;
  const about = royalExchangeData?.about_section;

  if (isLoading) {
    return <Loader title="Loading royal exchange..." fullScreen />;
  }

  if (isError) {
    console.log("Royal Exchange CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load royal exchange content.
      </div>
    );
  }

  if (!hero || !about) {
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

      <FounderStorySection about={about} />
    </div>
  );
};

export default RoyalExchange;