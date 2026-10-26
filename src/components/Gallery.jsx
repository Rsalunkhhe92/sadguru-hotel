import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { SectionHeading, SmartImage } from './ui'
import { gallery } from '../data/gallery'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const open = index !== null
  const hasStock = gallery.some((g) => g.image?.stock)

  const step = useCallback(
    (dir) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, step])

  return (
    <section id="gallery" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Gallery" marathi="छायाचित्रे" title="A glimpse of the table">
          {hasStock && (
            <span className="text-base">
              Representative photos for now — Sadguru Hotel’s own photos will be added soon.
            </span>
          )}
        </SectionHeading>

        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl sm:mb-4"
              aria-label={`View photo: ${g.caption}`}
            >
              <SmartImage
                image={g.image}
                alt={g.caption}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className={`w-full transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
              />
              <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-forest-950/80 via-transparent to-transparent p-3 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm font-medium text-white">{g.caption}</span>
                <Expand className="size-4 text-white" aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                image={gallery[index].image}
                alt={gallery[index].caption}
                sizes="90vw"
                priority
                className="max-h-[80vh] w-auto rounded-2xl"
              />
              <figcaption className="mt-3 text-center text-white/80">
                {gallery[index].caption}
                {gallery[index].image?.stock && <span className="text-white/50"> · representative image</span>}
              </figcaption>
            </motion.figure>

            <button type="button" onClick={() => setIndex(null)} className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Close">
              <X className="size-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6" aria-label="Previous photo">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6" aria-label="Next photo">
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
