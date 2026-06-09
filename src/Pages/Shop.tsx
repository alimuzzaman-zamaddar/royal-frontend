import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { CommonBanner } from "./components/CommonBanner";
import { ShopPage } from "./components/Shop/ShopPage";
import { Loader } from "../lib/Loader";
import { useGetShopCmsQuery } from "../redux/Slices/cmsApi";
import SEO from "../lib/SEO";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const Shop = () => {
  const { data, isLoading, isError, error } = useGetShopCmsQuery();

  const shopCmsData = data?.data;
  const hero = shopCmsData?.hero_section;

  if (isLoading) {
    return <Loader title="Loading shop..." fullScreen />;
  }

  if (isError) {
    console.log("Shop CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load shop content.
      </div>
    );
  }

  if (!hero) {
    return null;
  }

  return (
    <div>

            <SEO
        title="Buy Premium Apparel, luxury streetwear| Royal Exchange"
        description="Buy premium apparel, exclusive books, cloths and collectibles. Kings, Queens, shop with confidence at Royal Exchange at cost effective prices."
      />
      <CommonBanner
        id="lineage-hero"
        backgroundImage={getCmsAssetUrl(hero.background_image)}
        logoimg={logoimg}
        title={hero.title}
        description={hero.subtitle}
      />

      <ShopPage />
    </div>
  );
};

export default Shop;