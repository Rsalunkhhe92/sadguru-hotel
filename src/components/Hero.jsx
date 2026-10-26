import { motion } from 'framer-motion'
import { ChevronDown, Leaf, MapPin, Phone, UtensilsCrossed } from 'lucide-react'
import { Button, SmartImage, StockBadge, VegMark } from './ui'
import { images } from '../data/images'
import { site } from '../data/site'
import { formatPrice, getItem } from '../data/menu'
import { directionsHref, telHref } from '../lib/contact'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const thali = getItem('veg-thali')
  const special = getItem('sadguru-special-thali')

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-950">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <SmartImage image={images.hero} alt="A traditional vegetarian thali" priority className="size-full" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/85 to-forest-950/30" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/90 via-transparent to-forest-950/40" />
      <div className="absolute inset-0 -z-10 bg-rangoli-dark opacity-60" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
        <div>
          <motion.div {...fadeUp(0.1)} className="mb-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/40 bg-white/10 px-3.5 py-1.5 text-sm text-white backdrop-blur">
              <VegMark /> <span className="font-marathi">{site.tagline}</span> · {site.taglineEn}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500 px-3.5 py-1.5 text-sm font-semibold text-white">
              <Leaf className="size-4" aria-hidden="true" /> No Ajinomoto
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-marathi text-4xl leading-[1.25] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            स्वाद परंपरेचा,
            <br />
            <span className="bg-linear-to-r from-saffron-300 to-saffron-500 bg-clip-text text-transparent">
              विश्वास आपुलकीचा!
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="mt-5 font-display text-xl text-saffron-100 italic sm:text-2xl">
            Authentic Maharashtrian Taste, Served with Love.
          </motion.p>

          <motion.p {...fadeUp(0.45)} className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            Experience delicious Maharashtrian food, traditional thalis, fresh snacks, and authentic local flavours at
            Sadguru Hotel.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-wrap gap-3">
            <Button href="/#menu" icon={UtensilsCrossed}>
              Explore Our Menu
            </Button>
            <Button href={telHref} variant="light" icon={Phone}>
              Call Now
            </Button>
            <Button href={directionsHref} variant="light" icon={MapPin}>
              Get Directions
            </Button>
          </motion.div>
        </div>

        {/* Price card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden justify-self-end lg:block"
        >
          <div className="w-80 rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
            <p className="text-xs font-semibold tracking-[0.25em] text-saffron-300 uppercase">For single person</p>
            <p className="font-marathi text-sm text-white/70">एक थाळी एकाच व्यक्तिसाठी</p>
            <div className="mt-5 space-y-4">
              {[thali, special].filter(Boolean).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="flex items-center gap-2 font-display text-lg">
                    <VegMark /> {item.name}
                  </span>
                  <span className="font-display text-2xl font-semibold text-saffron-300">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-marathi text-saffron-200">{site.motto}</p>
          </div>
        </motion.div>
      </div>

      <StockBadge image={images.hero} className="absolute right-4 bottom-4" />

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-widest text-white/60 uppercase hover:text-white sm:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
