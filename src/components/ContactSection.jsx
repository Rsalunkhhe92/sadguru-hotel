import { useState } from 'react'
import { Clock, MapPin, Navigation, Phone, Send, Users } from 'lucide-react'
import { Button, Reveal, SectionHeading, WhatsAppIcon } from './ui'
import { site } from '../data/site'
import { directionsHref, hasMap, hasPhone, hasWhatsApp, phone, telHref, whatsappHref } from '../lib/contact'

const Pending = () => <span className="text-ink/45 italic">To be updated soon</span>

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-900/5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-saffron-300">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-forest-900">{title}</h3>
        <div className="mt-0.5 leading-relaxed text-ink/75">{children}</div>
      </div>
    </div>
  )
}

const field =
  'w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-ink placeholder:text-ink/35 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/25 focus:outline-none'

function BookingEnquiry() {
  const [form, setForm] = useState({ name: '', guests: '', date: '', time: '', note: '' })
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const lines = [
      'Namaskar! Group / family booking enquiry for Sadguru Hotel.',
      `Name: ${form.name}`,
      `Number of people: ${form.guests}`,
      form.date && `Date: ${form.date}`,
      form.time && `Time: ${form.time}`,
      form.note && `Note: ${form.note}`,
    ].filter(Boolean)
    window.open(whatsappHref(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-xl shadow-forest-900/10 ring-1 ring-forest-900/5 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-saffron-100 text-saffron-700">
          <Users className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-forest-900">Group & family booking enquiry</h3>
          <p className="text-sm text-ink/60">Sends your enquiry to us on WhatsApp.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Your name</span>
          <input required className={field} value={form.name} onChange={update('name')} autoComplete="name" />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Number of people</span>
          <input required type="number" min="1" inputMode="numeric" className={field} value={form.guests} onChange={update('guests')} />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Date</span>
          <input type="date" className={field} value={form.date} onChange={update('date')} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Preferred time</span>
          <input type="time" className={field} value={form.time} onChange={update('time')} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Message (optional)</span>
          <textarea rows={3} className={field} value={form.note} onChange={update('note')} placeholder="Occasion, seating preference, thali count…" />
        </label>
      </div>

      <button
        type="submit"
        disabled={!hasWhatsApp}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#178f47] disabled:cursor-not-allowed disabled:bg-ink/25 disabled:shadow-none"
      >
        <Send className="size-4" aria-hidden="true" /> Send enquiry on WhatsApp
      </button>
      {!hasWhatsApp && (
        <p className="mt-3 text-center text-sm text-ink/55">Enquiries will open once our WhatsApp number is added.</p>
      )}
    </form>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="bg-cream bg-rangoli py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact & Location" marathi="नक्की या!" title="Visit Sadguru Hotel">
          Come hungry, leave happy. We’d love to serve you.
        </SectionHeading>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            <InfoCard icon={MapPin} title={site.name}>
              {site.address ? <address className="not-italic">{site.address}</address> : <Pending />}
            </InfoCard>
            <InfoCard icon={Phone} title="Phone">
              {hasPhone ? (
                <a href={telHref} className="font-semibold text-forest-800 hover:text-saffron-600">
                  {phone}
                </a>
              ) : (
                <Pending />
              )}
            </InfoCard>
            <InfoCard icon={Clock} title="Opening hours">
              {site.hours.length ? (
                <ul>
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending />
              )}
            </InfoCard>

            {(hasPhone || hasWhatsApp || hasMap) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {hasPhone && <Button href={telHref} icon={Phone}>Call Now</Button>}
                {hasWhatsApp && (
                  <Button href={whatsappHref()} variant="whatsapp" icon={WhatsAppIcon}>
                    WhatsApp
                  </Button>
                )}
                {hasMap && <Button href={directionsHref} variant="outline" icon={Navigation}>Get Directions</Button>}
              </div>
            )}

            <div className="mt-2 flex-1 overflow-hidden rounded-3xl shadow-lg ring-1 ring-forest-900/10">
              {site.mapsEmbedUrl ? (
                <iframe
                  title="Sadguru Hotel location on Google Maps"
                  src={site.mapsEmbedUrl}
                  className="h-72 w-full lg:h-full lg:min-h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-3 bg-forest-900 bg-rangoli-dark p-6 text-center text-white lg:h-full lg:min-h-64">
                  <MapPin className="size-10 text-saffron-400" aria-hidden="true" />
                  <p className="font-display text-xl">Map coming soon</p>
                  <p className="max-w-xs text-sm text-white/65">Our Google Maps location will appear here once it’s added.</p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <BookingEnquiry />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
