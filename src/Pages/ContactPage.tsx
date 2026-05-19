import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { ContactSection } from "./components/contact/ContactSection";
import { Loader } from "../lib/Loader";
import { useGetContactCmsQuery } from "../redux/Slices/cmsApi";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const ContactPage = () => {
  const { data, isLoading, isError, error } = useGetContactCmsQuery();

  const contactCmsData = data?.data;
  const hero = contactCmsData?.hero_section;
  const contactSection = contactCmsData?.contact_section;

  if (isLoading) {
    return <Loader title="Loading contact..." fullScreen />;
  }

  if (isError) {
    console.log("Contact CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load contact content.
      </div>
    );
  }

  if (!hero || !contactSection) {
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

      <ContactSection contactSection={contactSection} />
    </div>
  );
};

export default ContactPage;