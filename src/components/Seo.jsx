import { useEffect } from 'react'
import { categories, currency, itemsInCategory } from '../data/menu'
import { site } from '../data/site'

/**
 * Injects schema.org Restaurant data (JSON-LD) for local search.
 * Address, phone and hours are included automatically once filled in site.js.
 */
export default function Seo() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: site.name,
      alternateName: site.marathiName,
      servesCuisine: ['Maharashtrian', 'Indian', 'Vegetarian'],
      ...(site.siteUrl && { url: site.siteUrl, menu: `${site.siteUrl.replace(/\/$/, '')}/menu` }),
      ...(site.phone && { telephone: site.phone }),
      ...(site.address && { address: site.address }),
      ...(site.mapsUrl && { hasMap: site.mapsUrl }),
      ...(site.hours.length && { openingHours: site.hours.map((h) => `${h.days} ${h.time}`) }),
      hasMenu: {
        '@type': 'Menu',
        hasMenuSection: categories.map((c) => ({
          '@type': 'MenuSection',
          name: c.name,
          hasMenuItem: itemsInCategory(c.id).map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            suitableForDiet: 'https://schema.org/VegetarianDiet',
            offers: {
              '@type': 'Offer',
              price: Array.isArray(item.price) ? item.price[0].price : item.price,
              priceCurrency: currency === '₹' ? 'INR' : currency,
            },
          })),
        })),
      },
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => script.remove()
  }, [])
  return null
}
