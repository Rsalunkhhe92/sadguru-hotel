import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { Button } from './ui'
import { telHref } from '../lib/contact'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'menu', label: 'Our Menu' },
  { id: 'specialities', label: 'Specialities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact Us' },
]

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-cream/95 shadow-[0_4px_30px_-12px_rgb(15_58_38/0.35)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link to="/#home" aria-label="Sadguru Hotel – home" onClick={() => setOpen(false)}>
          <Logo light={!solid} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ id, label }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <Link
                  to={`/#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    solid
                      ? isActive
                        ? 'text-saffron-600'
                        : 'text-forest-900 hover:text-saffron-600'
                      : isActive
                        ? 'text-saffron-300'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-saffron-500"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={telHref} icon={Phone} className="px-4! py-2.5! sm:px-5!" aria-label="Call Sadguru Hotel now">
            <span className="hidden sm:inline">Call Now</span>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full p-2.5 lg:hidden ${solid ? 'text-forest-900 hover:bg-forest-900/5' : 'text-white hover:bg-white/10'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4.5rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-cream bg-rangoli lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-4 pb-8">
              {navLinks.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={`/#${id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl ${
                      active === id ? 'bg-forest-900 text-white' : 'text-forest-900 hover:bg-forest-900/5'
                    }`}
                  >
                    {label}
                    <span className="size-1.5 rounded-full bg-saffron-500" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
