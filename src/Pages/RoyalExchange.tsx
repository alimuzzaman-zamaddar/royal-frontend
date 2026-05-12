import { CommonBanner } from './components/CommonBanner'
import royelbg from '../assets/lineage/royal.png'
import logoimg from '../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png'
import { FounderStorySection } from './components/royalexchange/FounderStorySection'

const RoyalExchange = () => {
  return (
    <div>
      <CommonBanner
        id="lineage-hero"
        backgroundImage={royelbg}
        logoimg={logoimg}
        title="THE ROYAL EXCHANGE"
        description="From Highland Park to the Throne"
      />

      <FounderStorySection />

    </div>
  )
}

export default RoyalExchange