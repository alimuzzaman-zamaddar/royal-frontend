import { Header } from './components/homepage/Header'
import { Hero } from './components/homepage/Hero'
import { LineageSection } from './components/homepage/LineageSection'
import { RoyalLibrarySection } from './components/homepage/RoyalLibrarySection'
import { RoyalExchangeSection } from './components/homepage/RoyalExchangeSection'
import { RoyalServicesSection } from './components/homepage/RoyalServicesSection'
import { EarthIsOursSection } from './components/homepage/EarthIsOursSection'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LineageSection />
      <RoyalLibrarySection />
      <RoyalExchangeSection />
      <RoyalServicesSection />
      <EarthIsOursSection />
    </div>
  )
}

export default Home