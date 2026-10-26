import { site } from '../data/site'

export default function Logo({ light = false, compact = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-900 ring-2 ring-saffron-500 ring-offset-2 ring-offset-transparent">
        <span className="font-marathi text-xl leading-none text-saffron-300 translate-y-0.5">स</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-marathi text-xl ${light ? 'text-white' : 'text-forest-900'}`}>
          ॥ {site.marathiName} ॥
        </span>
        {!compact && (
          <span
            className={`mt-1 text-[11px] font-semibold tracking-[0.25em] uppercase ${light ? 'text-saffron-300' : 'text-saffron-600'}`}
          >
            {site.name}
          </span>
        )}
      </span>
    </span>
  )
}
