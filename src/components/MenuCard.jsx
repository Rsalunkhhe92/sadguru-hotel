import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SmartImage, StockBadge, VegMark, VerifyNote } from './ui'
import { currency } from '../data/menu'
import { reviewMode } from '../lib/contact'

export function Price({ price, className = '' }) {
  if (Array.isArray(price)) {
    return (
      <span className={`flex flex-wrap justify-end gap-x-3 ${className}`}>
        {price.map((v) => (
          <span key={v.label} className="whitespace-nowrap">
            <span className="mr-1 text-xs font-medium tracking-wide text-ink/50 uppercase">{v.label}</span>
            {currency}
            {v.price}
          </span>
        ))}
      </span>
    )
  }
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {currency}
      {price}
    </span>
  )
}

const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.35 },
}

export default function MenuCard({ item }) {
  if (item.includes) return <ThaliCard item={item} />

  return (
    <motion.article
      {...cardMotion}
      className="group flex flex-col rounded-2xl border border-forest-900/8 bg-white px-5 py-4 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-saffron-300 hover:shadow-lg hover:shadow-saffron-500/10"
    >
      <div className="flex items-baseline gap-3">
        <VegMark className="translate-y-0.5 self-start" />
        <h4 className="font-display text-[17px] font-semibold text-forest-900 transition-colors group-hover:text-saffron-700">
          {item.name}
        </h4>
        <span className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-forest-900/15" aria-hidden="true" />
        <Price price={item.price} className="font-display text-lg font-semibold text-saffron-700" />
      </div>
      <VerifyNote note={item.verify} show={reviewMode} />
    </motion.article>
  )
}

function ThaliCard({ item }) {
  return (
    <motion.article
      {...cardMotion}
      className="group overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-forest-900/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-forest-900/15"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          image={item.image}
          alt={item.name}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="size-full transition-transform duration-700 group-hover:scale-105"
        />
        <StockBadge image={item.image} className="absolute bottom-3 left-3" />
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-saffron-600 uppercase">
              <VegMark /> For single person
            </p>
            <h4 className="mt-2 font-display text-2xl font-semibold text-forest-900 sm:text-3xl">{item.name}</h4>
          </div>
          <Price
            price={item.price}
            className="rounded-2xl bg-forest-900 px-4 py-2 font-display text-2xl font-semibold text-saffron-300"
          />
        </div>
        <p className="mt-5 mb-3 text-sm font-semibold text-ink/60">Thali includes</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
          {item.includes.map((dish) => (
            <li key={dish} className="flex items-center gap-2 text-[15px] text-ink/80">
              <Check className="size-4 shrink-0 text-forest-500" aria-hidden="true" />
              {dish}
            </li>
          ))}
        </ul>
        <VerifyNote note={item.verify} show={reviewMode} />
      </div>
    </motion.article>
  )
}
