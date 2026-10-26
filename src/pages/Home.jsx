import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import TodaysSpecial from '../components/TodaysSpecial'
import MenuSection from '../components/MenuSection'
import Specialities from '../components/Specialities'
import WhyChooseUs from '../components/WhyChooseUs'
import Gallery from '../components/Gallery'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton'
import Seo from '../components/Seo'
import { useDocumentTitle, useScrollToHash } from '../lib/hooks'

export default function Home() {
  useScrollToHash()
  useDocumentTitle('Sadguru Hotel | Pure Veg Maharashtrian Thali & Food')

  return (
    <>
      <Seo />
      <a
        href="#menu"
        className="sr-only z-[100] rounded-full bg-saffron-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to menu
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TodaysSpecial />
        <MenuSection />
        <Specialities />
        <WhyChooseUs />
        <Gallery />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  )
}
