import { HandHeart, IndianRupee, Soup, Sprout } from 'lucide-react'
import { Reveal, SectionHeading } from './ui'
import { visibleItems } from '../data/menu'

const features = [
  {
    icon: Sprout,
    title: 'Authentic Maharashtrian Flavours',
    text: 'Traditional dishes like Pithale, Bharale Wangi, Thecha and Solkadi, made the Maharashtrian way.',
  },
  {
    icon: Soup,
    title: 'Variety of Traditional Dishes',
    text: `${visibleItems.length} items on our menu – thalis, Maharashtrian mains, starters, sides and cold drinks.`,
  },
  {
    icon: IndianRupee,
    title: 'Affordable Menu',
    text: 'Clear, honest pricing with complete thalis for a single person.',
  },
  {
    icon: HandHeart,
    title: 'Warm Hospitality',
    text: 'A relaxed, welcoming place for families and friends to enjoy a meal together.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-cream-dark/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why choose us" marathi="आपुलकीचा पाहुणचार" title="Food that feels like home" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest-900/10"
            >
              <div className="absolute -top-10 -right-10 size-32 rounded-full bg-saffron-100 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-forest-900 text-saffron-300 shadow-lg shadow-forest-900/20">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="relative font-display text-xl font-semibold text-forest-900">{title}</h3>
              <p className="relative mt-2 leading-relaxed text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
