import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Printer, QrCode } from 'lucide-react'
import MenuCard from './MenuCard'
import { Button, SectionHeading, SmartImage } from './ui'
import { categories, itemsInCategory, menuFootnote } from '../data/menu'

const tabs = [{ id: 'all', name: 'All' }, ...categories]

export default function MenuSection() {
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? categories : categories.filter((c) => c.id === active)

  return (
    <section id="menu" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Menu" marathi="आमचा मेनू" title="Taste of Maharashtra, plate by plate">
          Pure vegetarian dishes, from complete thalis to traditional Maharashtrian mains.
        </SectionHeading>

        {/* Category filter */}
        <div className="sticky top-18 z-30 -mx-4 mb-10 bg-white/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:px-2">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="no-scrollbar flex gap-2 overflow-x-auto sm:justify-center"
          >
            {tabs.map((tab) => {
              const selected = active === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(tab.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                    selected ? 'text-white' : 'bg-cream text-forest-900 hover:bg-saffron-100'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-tab"
                      className="absolute inset-0 rounded-full bg-forest-900 shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                aria-label={category.name}
              >
                <div className="mb-6 flex items-center gap-4">
                  <SmartImage
                    image={category.image}
                    alt=""
                    sizes="64px"
                    className="size-14 shrink-0 rounded-full ring-4 ring-saffron-100 sm:size-16"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
                      {category.name}
                      <span className="ml-3 font-marathi text-lg font-normal text-saffron-700">{category.marathi}</span>
                    </h3>
                    {category.note && <p className="text-sm text-ink/60">{category.note}</p>}
                  </div>
                  <span className="hidden h-px flex-1 bg-linear-to-r from-gold/50 to-transparent md:block" />
                </div>
                <div className={`grid gap-4 sm:grid-cols-2 ${category.id === 'thali' ? 'sm:gap-6' : 'lg:grid-cols-3'}`}>
                  {itemsInCategory(category.id).map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 border-t border-forest-900/10 pt-10 text-center">
          <p className="text-sm text-ink/55">
            {menuFootnote} · Prices are in Indian Rupees and may change. Please confirm at the counter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/menu" variant="green" icon={QrCode}>
              Open digital menu
            </Button>
            <Button href="/menu?print=1" variant="outline" icon={Printer}>
              Printable menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
