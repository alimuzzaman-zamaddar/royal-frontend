import img from "../../../assets/photo_2026-05-04_11-01-16.jpg";

export const LineageSection = () => {
  return (
    <section className="lineage-section">
      <div className="lineage-container">
        {/* LEFT CONTENT */}
        <div className="lineage-content">
          <p className="lineage-label">Our Ancestral Lineage</p>

          <h2 className="lineage-heading">
            The Original Inhabitants <br />
            Of This Earth
          </h2>

          <p className="lineage-description">
            We are the descendants of the first nations, the builders of ancient
            civilizations, the keepers of sacred knowledge. Our lineage stretches
            back to the shores of Atlantis and the mound builders of this sacred
            land.
            <br />
            <br />
            Royal Exchange Publishing exists to reclaim that narrative — to
            publish the voices of those who carry this memory forward. Every
            book we publish, every garment we design, is a declaration of who we
            are and what we own.
          </p>

          <div className="lineage-quote-wrapper">
            <p className="lineage-quote">
              We do not seek permission to occupy what is already ours.
            </p>
          </div>

          <button className="lineage-button">
            READ OUR STORY
            <span aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 5L21 12M21 12L14 19M21 12H3"
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lineage-image-column">
          <div className="lineage-image-wrapper">
            <img src={img} alt="Lineage" className="lineage-image" />

            <p className="lineage-caption">The Royal Exchange Lineage</p>
          </div>
        </div>
      </div>
    </section>
  );
};