import { motion } from 'framer-motion'
import { WhatsAppIcon } from './ui'
import { hasWhatsApp, whatsappHref } from '../lib/contact'

/** Shown only once a WhatsApp / phone number is set in src/data/site.js */
export default function FloatingWhatsAppButton() {
  if (!hasWhatsApp) return null
  return (
    <motion.a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sadguru Hotel on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring' }}
      whileHover={{ scale: 1.08 }}
      className="no-print fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-xl shadow-green-900/30"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1fa855] opacity-25" />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  )
}
