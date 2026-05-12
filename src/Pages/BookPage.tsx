import { CommonBanner } from "./components/CommonBanner";
import logoimg from "../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import book from "../assets/lineage/book.png";
import { TheRoyalLibrarySection } from "./components/book/TheRoyalLibrarySection";

const BookPage = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={book}
        logoimg={logoimg}
        title="THE ROYAL LIBRARY"
        description="Words that carry the weight of legacy"
      />
      <TheRoyalLibrarySection />
    </div>
  );
};

export default BookPage;
