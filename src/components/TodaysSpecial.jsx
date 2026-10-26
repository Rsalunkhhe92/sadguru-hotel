import { Sparkles } from 'lucide-react'
import { Reveal, SmartImage, VegMark } from './ui'
import { Price } from './MenuCard'
import { todaysSpecial } from '../data/site'

/** Rendered only when todaysSpecial.enabled is true in src/data/site.js */
export default function TodaysSpecial() {
  const s = todaysSpecial
  if (!s.enabled || !s.title) return null

  return (
    <section aria-labelledby="todays-special" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-linear-to-br from-saffron-500 to-saffron-700 text-white shadow-2xl shadow-saffron-600/30 md:grid-cols-2">
        <SmartImage image={s.image} alt={s.title} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/10] size-full md:aspect-auto" />
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="size-4" aria-hidden="true" /> Today’s Special
          </p>
          <h2 id="todays-special" className="mt-3 flex items-center gap-3 font-display text-3xl font-semibold sm:text-4xl">
            <VegMark /> {s.title}
          </h2>
          {s.marathiTitle && <p className="mt-1 font-marathi text-xl text-saffron-100">{s.marathiTitle}</p>}
          {s.description && <p className="mt-4 text-lg text-white/85">{s.description}</p>}
          {s.price != null && (
            <Price price={s.price} className="mt-6 self-start rounded-full bg-white px-5 py-2 font-display text-2xl font-semibold text-saffron-700" />
          )}
        </div>
      </Reveal>
    </section>
  )
}
