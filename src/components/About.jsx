import { ChefHat, Flame, HeartHandshake, IndianRupee } from 'lucide-react'
import { Reveal, SectionHeading, SmartImage, StockBadge, VerifyNote } from './ui'
import { images } from '../data/images'
import { promises, site } from '../data/site'
import { reviewMode } from '../lib/contact'

const highlights = [
  { icon: ChefHat, title: 'Traditional Maharashtrian food', text: 'Home-style dishes like Pithale, Bharale Wangi and Shev-Bhaji.' },
  { icon: Flame, title: 'Freshly prepared dishes', text: 'Our food is cooked in our kitchen and served hot.' },
  { icon: IndianRupee, title: 'Affordable menu options', text: 'Full thalis, mains, starters and drinks at clear, simple prices.' },
  { icon: HeartHandshake, title: 'Family-friendly atmosphere', text: 'A welcoming place to sit down and eat with your family.' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream bg-rangoli py-20 sm:py-28">
      <div className="toran absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image collage */}
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-900/20 sm:aspect-[5/5]">
              <SmartImage image={images.bananaLeafThali} alt="A vegetarian thali served on a banana leaf" sizes="(min-width: 1024px) 45vw, 90vw" className="size-full" />
              <StockBadge image={images.bananaLeafThali} className="absolute top-4 left-4" />
            </div>
            <div className="absolute -right-3 -bottom-8 w-2/5 overflow-hidden rounded-3xl border-[6px] border-cream shadow-xl sm:-right-8">
              <SmartImage image={images.pavBhaji} alt="Maharashtrian street-style food" sizes="20vw" className="aspect-square w-full" />
            </div>
            <div className="absolute -top-5 -left-3 rounded-2xl bg-forest-900 px-5 py-4 text-white shadow-xl sm:-left-6">
              <p className="font-marathi text-2xl text-saffron-300">{site.tagline}</p>
              <p className="text-xs tracking-[0.2em] uppercase">{site.taglineEn}</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="About Sadguru Hotel" title="Homely Maharashtrian flavours, served with care" left className="mx-auto mb-8 lg:mx-0" />
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink/75">
                Sadguru Hotel is a pure vegetarian restaurant dedicated to traditional Maharashtrian cuisine. From our
                Veg Thali and Sadguru Special Thali to everyday favourites like Pithale, Mataki and Shev-Bhaji, we
                serve homely food in a warm, welcoming setting for families and friends.
              </p>
              <p className="mt-4 font-marathi text-xl text-forest-800">
                “{site.motto}” <span className="font-sans text-base text-ink/60">— {site.mottoEn}</span>
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.08} className="group rounded-2xl border border-forest-900/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-saffron-300 hover:shadow-lg">
                  <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700 transition-colors group-hover:bg-saffron-500 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-forest-900">{title}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-ink/65">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Kitchen promises – taken from the printed menu card */}
        <Reveal className="mt-24 rounded-[2rem] bg-forest-900 bg-rangoli-dark p-6 text-white sm:p-10">
          <p className="mb-6 text-center text-sm font-semibold tracking-[0.2em] text-saffron-300 uppercase">
            Our kitchen promise
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title} className="border-saffron-300/20 text-center lg:border-l lg:first:border-0 lg:px-4">
                <p className="font-display text-xl font-semibold text-saffron-200">{p.title}</p>
                {p.marathi && <p className="mt-1 font-marathi text-sm text-white/80">{p.marathi}</p>}
                <p className="mt-1 text-sm text-forest-100/80">{p.text}</p>
                <VerifyNote note={p.verify} show={reviewMode} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
