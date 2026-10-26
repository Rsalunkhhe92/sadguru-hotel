import { site } from '../data/site'

const digitsOnly = (value) => value.replace(/\D/g, '')

export const phone = site.phone.trim()
export const hasPhone = phone.length > 0
export const telHref = hasPhone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '/#contact'

const waNumber = digitsOnly(site.whatsapp || site.phone)
export const hasWhatsApp = waNumber.length > 0
export const whatsappHref = (message = 'Namaskar! I would like to enquire about Sadguru Hotel.') =>
  hasWhatsApp ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` : '/#contact'

export const hasMap = site.mapsUrl.trim().length > 0
export const directionsHref = hasMap ? site.mapsUrl : '/#contact'

/** Owner review mode: dev server, or any URL with ?review */
export const reviewMode =
  import.meta.env.DEV ||
  (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('review'))
