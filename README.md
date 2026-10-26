# Sadguru Hotel – Website

A responsive website for **Sadguru Hotel (॥ सद्गुरु ॥)**, a pure vegetarian Maharashtrian restaurant.
Built with React, Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # local development → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Pages

| URL         | What it is                                                                  |
| ----------- | --------------------------------------------------------------------------- |
| `/`         | Main website (Home, About, Menu, Specialities, Gallery, Contact)            |
| `/menu`     | Compact digital menu. Use this URL for the **table QR code**                |
| `/menu?print=1` | Same menu, opens the print dialog (A4, two columns)                     |

## Editing the content (owner guide)

Everything you will need to change is in **`src/data/`**. You never need to touch the components.

### 1. Contact details: `src/data/site.js` (**please fill these in first**)

```js
phone: '+91 98765 43210',
whatsapp: '',                       // leave empty to use the phone number
address: 'Shop no. …, Main Road, …',
hours: [{ days: 'Monday – Sunday', time: '11:00 AM – 11:00 PM' }],
mapsUrl: 'https://maps.app.goo.gl/…',        // Google Maps → Share → Copy link
mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=…', // Share → Embed a map → copy only the src="…" URL
siteUrl: 'https://your-domain.in',
```

Until these are filled in:
- **Call Now** and **Get Directions** scroll to the Contact section instead of dialling or opening Maps.
- The **floating WhatsApp button** stays hidden and the **booking enquiry form** stays disabled.
- The contact cards show "To be updated soon" and the map shows a placeholder.

Once you fill them in, all of these work automatically.

### 2. Menu and prices: `src/data/menu.js`

This is the only place prices are stored. Change a number and every part of the site updates.

```js
{ id: 'pithale', category: 'maharashtrian', name: 'Pithale', price: 200 },
```

- **Change a price:** edit `price`.
- **Two prices** (e.g. Fry / Roast): `price: [{ label: 'Fry', price: 30 }, { label: 'Roast', price: 20 }]`
- **Hide a dish temporarily:** add `hidden: true`.
- **Add a dish:** copy a line, give it a new unique `id`, and set its `category`.
- **Specialities section:** edit the `specialityIds` list at the bottom of the file.

### 3. Today's Special: `src/data/site.js`

Set `todaysSpecial.enabled` to `true` and fill in `title`, `description` and `price`. It appears under About.
It is turned off by default so that the site does not show a made-up special.

### 4. Photos: `src/data/images.js`

**All current photos are representative stock images from Unsplash. They do not show Sadguru Hotel's own food or premises**, and the site labels them "Representative image". Every stock photo shown is of vegetarian food.

To use your own photos:
1. Put them in `public/images/` (for example `public/images/veg-thali.jpg`). Landscape photos about 1600px wide work best.
2. In `images.js`, replace the entry: `vegThali: own('/images/veg-thali.jpg'),`

Your own photos are not labelled "Representative image". Gallery photos and captions are in `src/data/gallery.js`.

## Items flagged for owner verification

Review mode shows an amber **"Owner to verify"** note next to each flagged item. It is on automatically in
`npm run dev`, and on the live site you can open it by adding `?review` to the URL (e.g. `/menu?review`).
Customers never see these notes.

| Item | Question |
| --- | --- |
| Methi-Pithale | Card says "Methi-Pithale"; the brief said "Methichi Pithale". |
| Bharale Wangi | Spelling as on the card. Is "Bharli Vangi" preferred? |
| Tomato - Chatani | ₹220 on the card while most dishes in that section are ₹250. Is that correct? |
| Mahadya | The name is hard to read on the card. |
| Thecha / Shengdana Chatani | Card says "Shengdana"; the brief said "Shengadana". |
| SAKAS paneer line | Transcribed Marathi wording; please confirm. |
| "No cheese analogue" | The first word of that line on the card is unclear. |

All other names and prices match the printed menu card. The thali contents come from the card too. No other dish descriptions were added.

## Project structure

```
src/
  data/            ← owner-editable content
    menu.js          menu items, prices, categories, specialities
    site.js          name, phone, address, hours, maps, kitchen promises, today's special
    images.js        every photo URL in one place
    gallery.js       gallery photos + captions
  components/      Navbar, Hero, About, TodaysSpecial, MenuSection, MenuCard, Specialities,
                   WhyChooseUs, Gallery, ContactSection, Footer, FloatingWhatsAppButton, Seo, Logo, ui
  pages/           Home.jsx, DigitalMenu.jsx (/menu)
  lib/             contact link helpers, hooks
```

## Deploying

The output in `dist/` is static and can be hosted on Netlify, Vercel, Cloudflare Pages or any other static host.
The site uses a client-side route (`/menu`), so the host has to send every path to `index.html`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this.

## SEO

- The page title, meta description and Open Graph tags are in `index.html`.
- `src/components/Seo.jsx` adds schema.org **Restaurant** structured data, including the full menu with prices.
  Phone, address, hours and map link are added automatically once they are set in `site.js`.
