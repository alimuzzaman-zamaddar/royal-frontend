import { Hero } from './components/homepage/Hero'
import { LineageSection } from './components/homepage/LineageSection'
import { RoyalLibrarySection } from './components/homepage/RoyalLibrarySection'
import { RoyalExchangeSection } from './components/homepage/RoyalExchangeSection'
import { RoyalServicesSection } from './components/homepage/RoyalServicesSection'
import { EarthIsOursSection } from './components/homepage/EarthIsOursSection'
import { NewsletterPopup } from './components/homepage/NewsletterPopup'

const Home = () => {
  return (
    <div>
      <Hero />
      <LineageSection />
      <RoyalLibrarySection />
      <RoyalExchangeSection />
      <RoyalServicesSection />
      <EarthIsOursSection />
      <NewsletterPopup />
    </div>
  )
}

export default Home