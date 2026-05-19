import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { TheRoyalLibrarySection } from "./components/book/TheRoyalLibrarySection";
import { useGetBooksCmsQuery } from "../redux/Slices/cmsApi";
import { Loader } from "../lib/Loader";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const BookPage = () => {
  const { data, isLoading, isError, error } = useGetBooksCmsQuery();

  const booksCmsData = data?.data;
  const hero = booksCmsData?.hero_section;
  const library = booksCmsData?.library_section;

  if (isLoading) {
    return <Loader title="Loading books..." fullScreen />;
  }

  if (isError) {
    console.log("Books CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load books content.
      </div>
    );
  }

  if (!hero || !library) {
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

      <TheRoyalLibrarySection library={library} />
    </div>
  );
};

export default BookPage;