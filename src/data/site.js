/**
 * ─────────────────────────────────────────────────────────────
 *  SADGURU HOTEL – BUSINESS DETAILS  (edit this file)
 * ─────────────────────────────────────────────────────────────
 * Fields left as '' are shown as "to be updated" on the site,
 * and the related buttons (Call, WhatsApp, Directions) fall back
 * to the Contact section until a real value is filled in.
 */
import { images } from './images'

export const site = {
  name: 'Sadguru Hotel',
  marathiName: 'सद्‌गुरु', // contains a zero-width non-joiner after द् so it renders as द्‌ग (half-letter), not a stacked conjunct
  tagline: 'शुद्ध शाकाहारी', // from menu card
  taglineEn: 'Pure Vegetarian',
  motto: 'आरोग्य सर्वप्रथम..!', // from menu card
  mottoEn: 'Health comes first',

  // OWNER TO PROVIDE ↓
  phone: '', // e.g. '+91 98765 43210'
  whatsapp: '', // leave '' to use the phone number above
  email: '',
  address: '', // full postal address
  hours: [], // e.g. [{ days: 'Monday – Sunday', time: '11:00 AM – 11:00 PM' }]
  mapsUrl: '', // Google Maps "Share → Copy link" URL
  mapsEmbedUrl: '', // Google Maps "Share → Embed a map" iframe src URL
  siteUrl: '', // e.g. 'https://sadguruhotel.in' (used for SEO)
}

/**
 * Kitchen promises printed on the menu card.
 * `verify` notes are shown only in review mode (see README).
 */
export const promises = [
  { title: 'No Ajinomoto', text: 'We do not add Ajinomoto (MSG) to our food.', marathi: 'नो अजिनोमोटो' },
  { title: 'Pure Vegetarian', text: 'A completely vegetarian kitchen.', marathi: 'शुद्ध शाकाहारी' },
  {
    title: 'SAKAS Paneer',
    text: 'We use SAKAS paneer made from pure milk from the Koyna region.',
    marathi: 'आम्ही कोयना काठच्या शुद्ध दुधापासून बनविलेले सकस पनीर वापरतो.',
    verify: 'Transcribed from the menu card – please confirm wording.',
  },
  {
    title: 'No Cheese Analogue',
    text: 'We do not use cheese analogue.',
    verify: 'First word of this line on the menu card is unclear – please confirm.',
  },
]

/**
 * "Today's Special" banner. Set enabled: true and fill the fields
 * whenever you want to promote a dish of the day.
 */
export const todaysSpecial = {
  enabled: false,
  title: '',
  marathiTitle: '',
  description: '',
  price: null,
  image: images.pithale,
}
