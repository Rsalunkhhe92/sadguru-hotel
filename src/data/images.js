/**
 * All photographs used on the site live here.
 *
 * The current photos are REPRESENTATIVE STOCK IMAGES from Unsplash
 * (free to use under the Unsplash License). They do NOT show Sadguru Hotel's
 * own food or premises.
 *
 * To use your own photos: put the file in /public/images/ and replace an entry,
 * e.g.   vegThali: own('/images/veg-thali.jpg'),
 */

const unsplash = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

const stock = (id) => ({
  src: unsplash(id, 1200),
  srcSet: [480, 800, 1200, 1800].map((w) => `${unsplash(id, w)} ${w}w`).join(', '),
  stock: true,
})

// eslint-disable-next-line no-unused-vars
const own = (src) => ({ src, stock: false })

export const images = {
  hero: stock('1546833999-b9f581a1996d'),
  vegThali: stock('1546833999-b9f581a1996d'),
  specialThali: stock('1626777552726-4a6b54c97e46'),
  bananaLeafThali: stock('1625398407796-82650a8c135f'),
  steelThali: stock('1567337710282-00832b415979'),
  pithale: stock('1604152135912-04a022e23696'),
  bharaleWangi: stock('1631452180519-c014fe946bc7'),
  shevBhaji: stock('1610192244261-3f33de3f55e4'),
  matakiMasala: stock('1567337710282-00832b415979'),
  pavBhaji: stock('1606491956689-2ea866880c84'),
  curryBowls: stock('1588166524941-3bf61a9c41db'),
  palakPaneer: stock('1589647363585-f4a7d3877b10'),
  paneerChilli: stock('1567188040759-fb8a883dc6d8'),
  snacks: stock('1601050690117-94f5f6fa8bd7'),
  samosa: stock('1601050690597-df0568f70950'),
  breakfastPlate: stock('1630383249896-424e482df921'),
  tableSpread: stock('1613292443284-8d10ef9383fe'),
  interior1: stock('1517248135467-4c7edcad34c4'),
  interior2: stock('1552566626-52f8b828add9'),
  interior3: stock('1555396273-367ea4eb4db5'),
}
