import { Link } from 'react-router-dom'
import { MapPin, Navigation, Phone } from 'lucide-react'
import Logo from './Logo'
import { WhatsAppIcon } from './ui'
import { navLinks } from './Navbar'
import { categories } from '../data/menu'
import { site } from '../data/site'
import { directionsHref, hasMap, hasPhone, hasWhatsApp, phone, telHref, whatsappHref } from '../lib/contact'

const linkClass = 'text-forest-100/75 transition-colors hover:text-saffron-300'

export default function Footer() {
  return (
    <footer className="no-print bg-forest-950 text-white">
      <div className="toran rotate-180" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed text-forest-100/70">
            Pure vegetarian Maharashtrian thalis and traditional dishes, served with love.
          </p>
          <p className="mt-4 font-marathi text-lg text-saffron-300">{site.motto}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="mb-4 font-display text-lg font-semibold text-saffron-200">Quick links</h3>
          <ul className="space-y-2.5">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <Link to={`/#${id}`} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-saffron-200">Menu</h3>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/menu#${c.id}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/menu" className="font-semibold text-saffron-400 hover:text-saffron-300">
                Digital menu →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-saffron-200">Contact</h3>
          <ul className="space-y-3 text-forest-100/75">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-saffron-400" aria-hidden="true" />
              <span>{site.address || 'Address to be updated'}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-saffron-400" aria-hidden="true" />
              {hasPhone ? (
                <a href={telHref} className={linkClass}>
                  {phone}
                </a>
              ) : (
                <span>Phone to be updated</span>
              )}
            </li>
            {hasWhatsApp && (
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-1 size-4 shrink-0 text-saffron-400" />
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Chat on WhatsApp
                </a>
              </li>
            )}
            {hasMap && (
              <li className="flex gap-3">
                <Navigation className="mt-1 size-4 shrink-0 text-saffron-400" aria-hidden="true" />
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Google Maps directions
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-forest-100/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
