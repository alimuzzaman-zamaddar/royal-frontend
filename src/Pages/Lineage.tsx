import { CommonBanner } from "./components/CommonBanner";
import lineageBg from "../assets/lineage/Frame1.png";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";

const Lineage = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={lineageBg}
        logoimg={logoimg}
        title="The Current That Outlasts The Flood"
        description="Before the flood, before the fire, before the forgetting — there were the keepers of flame. Those who knew story is not content. It is covenant."
        subDescription="Royal Exchange descends from that lineage: Indigenous American and Atlantean memory, survived and unbroken."
      />
    </div>
  );
};

export default Lineage;
