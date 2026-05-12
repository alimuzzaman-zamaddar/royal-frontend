import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import contact from "../assets/lineage/contactbg.png";
import { ContactSection } from "./components/contact/ContactSection";


const ContactPage = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={contact}
        logoimg={logoimg}
        title="THE ROYAL LIBRARY"
        description="Words that carry the weight of legacy"
      />
      <ContactSection />
    </div>
  );
};

export default ContactPage;
