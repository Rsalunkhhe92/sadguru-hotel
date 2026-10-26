import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, Phone, Printer } from 'lucide-react'
import Logo from '../components/Logo'
import { Price } from '../components/MenuCard'
import { Ornament, VegMark, VerifyNote, WhatsAppIcon } from '../components/ui'
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton'
import Seo from '../components/Seo'
import { categories, itemsInCategory, menuFootnote } from '../data/menu'
import { promises, site } from '../data/site'
import { hasPhone, hasWhatsApp, phone, reviewMode, telHref, whatsappHref } from '../lib/contact'
import { useDocumentTitle, useScrollToHash } from '../lib/hooks'

/**
 * Compact, fast-loading menu for QR-code access (/menu) that also prints
 * cleanly on A4 (/menu?print=1 opens the print dialog automatically).
 */
export default function DigitalMenu() {
  const [params] = useSearchParams()
  useScrollToHash()
  useDocumentTitle('Menu & Prices | Sadguru Hotel')

  useEffect(() => {
    if (!params.has('print')) return
    const timer = setTimeout(() => window.print(), 600)
    return () => clearTimeout(timer)
  }, [params])

  return (
    <div className="min-h-screen bg-cream bg-rangoli print:bg-white">
      <Seo />
      <header className="no-print sticky top-0 z-40 border-b border-forest-900/10 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-saffron-600">
            <ArrowLeft className="size-4" aria-hidden="true" /> Website
          </Link>
          <div className="flex gap-2">
            {hasPhone && (
              <a href={telHref} className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-white">
                <Phone className="size-4" aria-hidden="true" /> Call
              </a>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-full border border-forest-800 px-4 py-2 text-sm font-semibold text-forest-800 hover:bg-forest-800 hover:text-white"
            >
              <Printer className="size-4" aria-hidden="true" /> Print
            </button>
          </div>
        </div>
        <nav aria-label="Menu categories" className="no-scrollbar mx-auto flex max-w-4xl gap-2 overflow-x-auto px-4 pb-3">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 hover:bg-forest-900 hover:text-white"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 print:max-w-none print:px-0 print:py-0">
        <div className="text-center">
          <div className="inline-block">
            <Logo />
          </div>
          <p className="mt-3 font-marathi text-forest-800">
            {site.tagline} · {site.motto}
          </p>
          <p className="mt-1 text-sm text-ink/60">
            {promises.slice(0, 2).map((p) => p.title).join(' · ')}
          </p>
          <Ornament className="mt-4" />
        </div>

        <div className="mt-8 gap-8 md:columns-2 print:columns-2 print:text-[12px]">
          {categories.map((c) => (
            <section key={c.id} id={c.id} className="print-break-avoid mb-8 break-inside-avoid scroll-mt-32">
              <h2 className="border-b-2 border-saffron-500 pb-1.5 font-display text-2xl font-semibold text-forest-900 print:text-lg">
                {c.name} <span className="font-marathi text-base font-normal text-saffron-700">{c.marathi}</span>
              </h2>
              {c.note && <p className="mt-1 text-sm text-ink/60">{c.note}</p>}
              <ul className="mt-3 divide-y divide-forest-900/8">
                {itemsInCategory(c.id).map((item) => (
                  <li key={item.id} className="py-2.5 print:py-1">
                    <div className="flex items-baseline gap-2">
                      <VegMark className="translate-y-0.5 self-start print:hidden" />
                      <span className="font-semibold text-forest-900">{item.name}</span>
                      <span className="flex-1 border-b border-dotted border-forest-900/20" aria-hidden="true" />
                      <Price price={item.price} className="font-display font-semibold text-saffron-700" />
                    </div>
                    {item.includes && (
                      <p className="mt-1 flex flex-wrap gap-x-3 pl-6 text-sm text-ink/65">
                        {item.includes.map((d) => (
                          <span key={d} className="inline-flex items-center gap-1">
                            <Check className="size-3 text-forest-500" aria-hidden="true" />
                            {d}
                          </span>
                        ))}
                      </p>
                    )}
                    <div className="no-print">
                      <VerifyNote note={item.verify} show={reviewMode} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-4 border-t border-forest-900/10 pt-6 text-center text-sm text-ink/60">
          <p>{menuFootnote} · All dishes are vegetarian.</p>
          {(site.address || hasPhone) && (
            <p className="mt-1">
              {site.address}
              {site.address && hasPhone && ' · '}
              {hasPhone && phone}
            </p>
          )}
          {hasWhatsApp && (
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="no-print mt-4 inline-flex items-center gap-2 font-semibold text-[#178f47]">
              <WhatsAppIcon className="size-4" /> Enquire on WhatsApp
            </a>
          )}
        </footer>
      </main>
      <FloatingWhatsAppButton />
    </div>
  )
}
