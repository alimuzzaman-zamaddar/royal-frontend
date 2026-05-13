import Servicesimg from "../assets/lineage/shopbg.png";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { CommonBanner } from "./components/CommonBanner";
import { ShopPage } from "./components/Shop/ShopPage";
const Shop = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={Servicesimg}
        logoimg={logoimg}
        title="THE ROYAL SERVICE"
        description="We build the throne so you can wear the crown"
      />
      <ShopPage />
    </div>
  );
};

export default Shop;
