import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading, SmartImage, StockBadge, VegMark } from './ui'
import { Price } from './MenuCard'
import { categories, getItem, specialityIds } from '../data/menu'

// First two cards (the thalis) are larger on desktop (bento layout)
const layout = ['lg:col-span-2 lg:row-span-2', 'lg:col-span-2 lg:row-span-2']

export default function Specialities() {
  const items = specialityIds.map(getItem).filter(Boolean)

  return (
    <section id="specialities" className="relative overflow-hidden bg-forest-900 bg-rangoli-dark py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-saffron-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-96 rounded-full bg-forest-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading light eyebrow="Specialities" marathi="आमची खासियत" title="Dishes our guests come back for">
          Traditional favourites from our kitchen, prepared the Maharashtrian way.
        </SectionHeading>

        <div className="grid auto-rows-[18rem] gap-5 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4">
          {items.map((item, i) => {
            const category = categories.find((c) => c.id === item.category)
            return (
              <motion.a
                key={item.id}
                href="#menu"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className={`group relative isolate overflow-hidden rounded-3xl shadow-xl ${layout[i] ?? ''}`}
              >
                <SmartImage
                  image={item.image}
                  alt={item.name}
                  sizes={i < 2 ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                  className="absolute inset-0 -z-10 size-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/95 via-forest-950/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <StockBadge image={item.image} className="absolute top-4 right-4" />

                <div className="flex h-full flex-col justify-end p-6">
                  <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-saffron-300 uppercase">
                    {category?.name}
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <h3
                      className={`flex items-center gap-2 font-display font-semibold text-white ${i < 2 ? 'text-2xl sm:text-3xl' : 'text-2xl lg:text-xl xl:text-2xl'}`}
                    >
                      <VegMark />
                      {item.name}
                    </h3>
                    <Price
                      price={item.price}
                      className="rounded-full bg-saffron-500 px-4 py-1.5 font-display text-lg font-semibold text-white shadow-lg"
                    />
                  </div>
                  <span className="mt-3 inline-flex max-h-0 items-center gap-1 overflow-hidden text-sm font-medium text-saffron-200 opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100">
                    View on menu <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
