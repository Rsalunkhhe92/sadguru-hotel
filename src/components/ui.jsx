import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'

/** Internal paths ("/#menu", "/menu") use the router; everything else is a normal link. */
export function SmartLink({ href, children, ...props }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...props}>
      {children}
    </a>
  )
}

const buttonStyles = {
  primary:
    'bg-saffron-500 text-white shadow-lg shadow-saffron-500/25 hover:bg-saffron-600 hover:shadow-saffron-600/30',
  green: 'bg-forest-800 text-white shadow-lg shadow-forest-900/20 hover:bg-forest-700',
  outline: 'border-2 border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white',
  light: 'border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20',
  whatsapp: 'bg-[#1fa855] text-white shadow-lg shadow-green-700/20 hover:bg-[#178f47]',
}

export function Button({ href, variant = 'primary', icon: Icon, children, className = '', ...props }) {
  return (
    <SmartLink
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="size-[18px]" aria-hidden="true" />}
      {children}
    </SmartLink>
  )
}

/** Lazy, responsive image with a graceful fallback if a photo fails to load. */
export function SmartImage({ image, alt, sizes = '100vw', priority = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!image || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-linear-to-br from-forest-800 to-forest-950 text-saffron-200 ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="size-7 opacity-70" aria-hidden="true" />
        <span className="text-xs tracking-wide opacity-80">Photo coming soon</span>
      </div>
    )
  }
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}

export function StockBadge({ image, className = '' }) {
  if (!image?.stock) return null
  return (
    <span
      className={`rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm ${className}`}
    >
      Representative image
    </span>
  )
}

/** Indian FSSAI-style vegetarian mark */
export function VegMark({ className = '' }) {
  return (
    <span
      className={`inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-forest-600 bg-white ${className}`}
      title="Vegetarian"
    >
      <span className="size-2 rounded-full bg-forest-600" />
      <span className="sr-only">Vegetarian</span>
    </span>
  )
}

export function Ornament({ className = '', light = false }) {
  const line = light ? 'bg-saffron-300/60' : 'bg-gold/60'
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-10 sm:w-16 ${line}`} />
      <svg viewBox="0 0 40 24" className={`h-5 w-8 ${light ? 'text-saffron-300' : 'text-saffron-500'}`}>
        <path
          fill="currentColor"
          d="M20 2c2.6 3.4 3.8 6.6 3.6 9.8C26 9 29.4 7.6 33.6 7.8c-1.8 4.6-5 7.6-9.6 9 1.8.4 3.4 1.4 4.6 2.8-3 1.2-6 1.2-8.6 0-2.6 1.2-5.6 1.2-8.6 0 1.2-1.4 2.8-2.4 4.6-2.8-4.6-1.4-7.8-4.4-9.6-9 4.2-.2 7.6 1.2 10 4C16.2 8.6 17.4 5.4 20 2Z"
        />
      </svg>
      <span className={`h-px w-10 sm:w-16 ${line}`} />
    </div>
  )
}

export function SectionHeading({ eyebrow, marathi, title, children, light = false, left = false, className = '' }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${left ? 'text-center lg:text-left' : 'mx-auto text-center'} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold tracking-[0.2em] uppercase ${light ? 'text-saffron-300' : 'text-saffron-600'}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-forest-900'}`}
      >
        {title}
      </h2>
      {marathi && (
        <p className={`mt-2 font-marathi text-lg ${light ? 'text-saffron-200' : 'text-saffron-700'}`}>{marathi}</p>
      )}
      <Ornament className={`mt-4 ${left ? 'lg:justify-start' : ''}`} light={light} />
      {children && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-forest-100' : 'text-ink/70'}`}>{children}</p>
      )}
    </Reveal>
  )
}

export function Reveal({ children, className = '', delay = 0, y = 24, as = 'div' }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

export function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 9.42 9.44c0 5.2-4.23 9.42-9.43 9.42m8.02-17.44A11.26 11.26 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.25l5.6-1.47a11.3 11.3 0 0 0 5.84 1.6h.01c6.25 0 11.34-5.1 11.35-11.35a11.3 11.3 0 0 0-3.32-8.03" />
    </svg>
  )
}

/** Small amber note visible only in review mode, flagging content the owner should confirm. */
export function VerifyNote({ note, show }) {
  if (!show || !note) return null
  return (
    <p className="mt-1.5 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs leading-snug text-amber-900">
      <span className="font-semibold">Owner to verify:</span> {note}
    </p>
  )
}
