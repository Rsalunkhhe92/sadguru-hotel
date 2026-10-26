/**
 * ─────────────────────────────────────────────────────────────
 *  SADGURU HOTEL – MENU & PRICES  (single source of truth)
 * ─────────────────────────────────────────────────────────────
 * Transcribed from the printed menu card. Every price on the website
 * is read from this file – change a number here and it updates
 * everywhere (menu, specialities, digital/printable menu).
 *
 * Item fields
 *   id        unique key (don't change once live)
 *   name      dish name as printed on the menu card
 *   price     a number (₹), OR a list of variants:
 *             [{ label: 'Fry', price: 30 }, { label: 'Roast', price: 20 }]
 *   includes  (thalis only) what comes in the plate – from the menu card
 *   image     optional photo (see images.js)
 *   verify    a note for the owner; shown only in review mode, never to customers
 *   hidden    true to temporarily remove a dish from the site
 *
 * All dishes are vegetarian – the restaurant is शुद्ध शाकाहारी (pure veg).
 */
import { images } from './images'

export const currency = '₹'
export const menuFootnote = '*G.S.T. Applicable'

export const categories = [
  {
    id: 'thali',
    name: 'Thalis',
    marathi: 'थाळी',
    note: 'एक थाळी एकाच व्यक्तिसाठी · One thali is for a single person',
    image: images.vegThali,
  },
  { id: 'starters', name: 'Starters', marathi: 'स्टार्टर', image: images.snacks },
  {
    id: 'maharashtrian',
    name: 'Maharashtrian Dishes',
    marathi: 'महाराष्ट्रीयन पदार्थ',
    image: images.curryBowls,
  },
  { id: 'sides', name: 'With Main Course', marathi: 'सोबत', image: images.breakfastPlate },
  { id: 'beverages', name: 'Cold Beverages', marathi: 'थंड पेये', image: images.tableSpread },
]

export const menuItems = [
  // ── Thalis ──────────────────────────────────────────────
  {
    id: 'veg-thali',
    category: 'thali',
    name: 'Veg Thali',
    price: 250,
    includes: ['Akkha Masur', 'Mix Veg', 'Dal Fry', 'Dahi', 'Papad', 'Rice', 'Chapati / Roti'],
    image: images.vegThali,
  },
  {
    id: 'sadguru-special-thali',
    category: 'thali',
    name: 'Sadguru Special Thali',
    price: 280,
    includes: ['Paneer Masala', 'Mix Veg', 'Dal Fry', 'Rice', 'Papad', 'Chapati / Roti', 'Sweet', 'Dahi'],
    image: images.specialThali,
  },

  // ── Starters ────────────────────────────────────────────
  { id: 'masala-papad', category: 'starters', name: 'Masala Papad', price: 50 },
  {
    id: 'fry-roast-papad',
    category: 'starters',
    name: 'Fry Papad / Roast Papad',
    price: [
      { label: 'Fry', price: 30 },
      { label: 'Roast', price: 20 },
    ],
  },
  { id: 'finger-chips', category: 'starters', name: 'Finger Chips', price: 120 },
  { id: 'green-salad', category: 'starters', name: 'Green Salad', price: 100 },
  { id: 'tomato-soup', category: 'starters', name: 'Tomato Soup', price: 120 },
  { id: 'manchow-soup', category: 'starters', name: 'Manchow Soup', price: 120 },
  { id: 'manchurian-dry', category: 'starters', name: 'Manchurian Dry', price: 200 },
  { id: 'paneer-chilli', category: 'starters', name: 'Paneer Chilli', price: 240 },

  // ── Maharashtrian dishes ────────────────────────────────
  { id: 'pithale', category: 'maharashtrian', name: 'Pithale', price: 200, image: images.pithale },
  {
    id: 'methi-pithale',
    category: 'maharashtrian',
    name: 'Methi-Pithale',
    price: 250,
    verify: 'Menu card reads "Methi-Pithale"; the brief said "Methichi Pithale". Confirm preferred name.',
  },
  { id: 'mataki-fry', category: 'maharashtrian', name: 'Mataki Fry', price: 250 },
  {
    id: 'mataki-masala',
    category: 'maharashtrian',
    name: 'Mataki Masala',
    price: 250,
    image: images.matakiMasala,
  },
  { id: 'bhendi-fry', category: 'maharashtrian', name: 'Bhendi Fry', price: 250 },
  { id: 'bhendi-masala', category: 'maharashtrian', name: 'Bhendi Masala', price: 250 },
  { id: 'lasuni-methi', category: 'maharashtrian', name: 'Lasuni-Methi', price: 250 },
  { id: 'baingan-masala', category: 'maharashtrian', name: 'Baingan Masala', price: 250 },
  {
    id: 'bharale-wangi',
    category: 'maharashtrian',
    name: 'Bharale Wangi',
    price: 250,
    image: images.bharaleWangi,
    verify: 'Spelling as on card. Also commonly written "Bharli Vangi" – confirm preferred spelling.',
  },
  {
    id: 'tomato-chatani',
    category: 'maharashtrian',
    name: 'Tomato - Chatani',
    price: 220,
    verify: 'Price reads ₹220 on the card (most dishes in this section are ₹250) – please confirm.',
  },
  { id: 'shev-bhaji', category: 'maharashtrian', name: 'Shev-Bhaji', price: 250, image: images.shevBhaji },
  { id: 'akkha-masoor', category: 'maharashtrian', name: 'Akkha Masoor', price: 250 },
  {
    id: 'mahadya',
    category: 'maharashtrian',
    name: 'Mahadya',
    price: 250,
    verify: 'Dish name is hard to read on the menu card – please confirm spelling.',
  },

  // ── With main course ────────────────────────────────────
  {
    id: 'thecha-chatani',
    category: 'sides',
    name: 'Thecha / Shengdana Chatani',
    price: 30,
    verify: 'Card reads "Shengdana"; the brief said "Shengadana". Confirm spelling.',
  },
  { id: 'dahi-wati', category: 'sides', name: 'Dahi Wati', price: 50 },
  { id: 'sweet-wati', category: 'sides', name: 'Sweet Wati', price: 50 },

  // ── Cold beverages ──────────────────────────────────────
  { id: 'sweet-lassi-solkadi', category: 'beverages', name: 'Sweet Lassi / Solkadi', price: 50 },
  { id: 'butter-milk', category: 'beverages', name: 'Butter Milk', price: 30 },
  { id: 'masala-butter-milk', category: 'beverages', name: 'Masala Butter Milk', price: 40 },
]

/** Dishes shown in the "Specialities" section, in this order. */
export const specialityIds = [
  'veg-thali',
  'sadguru-special-thali',
  'pithale',
  'bharale-wangi',
  'shev-bhaji',
  'mataki-masala',
]

// ── helpers ───────────────────────────────────────────────
export const visibleItems = menuItems.filter((item) => !item.hidden)

export const getItem = (id) => visibleItems.find((item) => item.id === id)

export const itemsInCategory = (categoryId) =>
  visibleItems.filter((item) => item.category === categoryId)

export const formatPrice = (price) =>
  Array.isArray(price)
    ? price.map((v) => `${currency}${v.price}`).join(' / ')
    : `${currency}${price}`
