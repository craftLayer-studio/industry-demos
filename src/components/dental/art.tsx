import type {SVGProps} from 'react';

/** Arbour mark: a rounded arch (the "arbour") cradling a soft tooth form. */
export function ArbourMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true" focusable="false" {...props}>
      <rect x="1" y="1" width="30" height="30" rx="10" fill="var(--color-accent)" />
      <path
        d="M8 25V15a8 8 0 0 1 16 0v10"
        fill="none"
        stroke="var(--color-on-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12.4 13.6c1.2-.9 2.4-.6 3.6.1 1.2-.7 2.4-1 3.6-.1 1.3 1 1 3.3.4 4.9-.4 1.1-.7 2.6-1 3.5-.2.6-1 .6-1.2 0l-.8-2.4c-.3-.8-1.5-.8-1.8 0l-.8 2.4c-.2.6-1 .6-1.2 0-.3-.9-.6-2.4-1-3.5-.6-1.6-.9-3.9.2-4.9Z"
        fill="var(--color-on-accent)"
      />
    </svg>
  );
}

/**
 * Hero illustration: layered ice-blue arches, a soft glass tooth form and
 * floating pebbles. Purely decorative and original.
 */
export function HeroArt() {
  return (
    <svg viewBox="0 0 520 520" role="presentation" aria-hidden="true" focusable="false" className="arbour-hero-art">
      <defs>
        <linearGradient id="arbour-arch-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--arbour-ice-strong)" />
          <stop offset="1" stopColor="var(--arbour-ice)" />
        </linearGradient>
        <linearGradient id="arbour-arch-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--arbour-glacier)" />
          <stop offset="1" stopColor="var(--arbour-ice-strong)" />
        </linearGradient>
        <linearGradient id="arbour-tooth" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="var(--arbour-ice)" />
        </linearGradient>
        <radialGradient id="arbour-glow" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer arch */}
      <path d="M40 500V250C40 134 134 40 260 40s220 94 220 210v250Z" fill="url(#arbour-arch-a)" />
      {/* Inner arch */}
      <path d="M100 500V262c0-90 72-160 160-160s160 70 160 160v238Z" fill="url(#arbour-arch-b)" opacity="0.55" />
      <path d="M150 500V272c0-62 50-112 110-112s110 50 110 112v228Z" fill="var(--arbour-frost)" />
      <circle cx="260" cy="250" r="150" fill="url(#arbour-glow)" />

      {/* Tooth form */}
      <g transform="translate(186 170)">
        <path
          d="M18 26C40 8 62 14 74 22c12-8 34-14 56 4 26 21 18 66 6 98-8 22-12 52-18 72-4 12-20 12-24 0l-12-44c-4-14-22-14-26 0l-12 44c-4 12-20 12-24 0-6-20-10-50-18-72C-6 92-8 47 18 26Z"
          fill="url(#arbour-tooth)"
          stroke="var(--arbour-glacier)"
          strokeWidth="2"
        />
        <path d="M30 44c10-10 24-12 34-6" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Sparkle */}
      <g fill="var(--color-accent)" opacity="0.85">
        <path d="M392 150l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" />
        <path d="M128 214l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" opacity="0.6" />
      </g>

      {/* Pebbles */}
      <circle cx="430" cy="420" r="26" fill="var(--arbour-pearl)" stroke="var(--arbour-silver)" strokeWidth="2" />
      <circle cx="96" cy="452" r="16" fill="var(--arbour-glacier)" opacity="0.7" />
      <ellipse cx="260" cy="492" rx="150" ry="10" fill="var(--arbour-silver)" opacity="0.6" />
    </svg>
  );
}

/** Small category glyphs drawn on a 24px grid. */
export function CategoryGlyph({id}: {id: string}) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  let body;
  switch (id) {
    case 'hygiene':
      body = (
        <>
          <path {...common} d="M5 19 15 9" />
          <rect {...common} x="14" y="3" width="6" height="7" rx="2" transform="rotate(45 17 6.5)" />
          <path {...common} d="M6 8.5v.01M9 5.5v.01M4 12v.01" />
        </>
      );
      break;
    case 'whitening':
      body = (
        <>
          <path {...common} d="M12 3l1.8 4.6L18.5 9l-4.7 1.6L12 15l-1.8-4.4L5.5 9l4.7-1.4Z" />
          <path {...common} d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
        </>
      );
      break;
    case 'aligners':
      body = (
        <>
          <path {...common} d="M4 9c2-3 14-3 16 0" />
          <path {...common} d="M4 9c0 4 2 7 4 7h8c2 0 4-3 4-7" />
          <path {...common} d="M8 12v1M12 12v1M16 12v1" />
        </>
      );
      break;
    case 'implants':
      body = (
        <>
          <path {...common} d="M7 5c2-1.5 3.5-1 5 0 1.5-1 3-1.5 5 0 1.5 1.5.5 4-1 5H8C6.5 9 5.5 6.5 7 5Z" />
          <path {...common} d="M9 13h6M9.5 16h5M10 19h4" />
        </>
      );
      break;
    case 'aesthetics':
      body = (
        <>
          <path {...common} d="M12 3c4 0 6.5 3 6.5 7 0 5-3 9-6.5 9S5.5 15 5.5 10c0-4 2.5-7 6.5-7Z" />
          <path {...common} d="M9.5 14c1.5 1.2 3.5 1.2 5 0" />
        </>
      );
      break;
    default:
      body = (
        <path
          {...common}
          d="M6.5 5c2-1.6 3.8-1.2 5.5-.2 1.7-1 3.5-1.4 5.5.2 2.2 1.8 1.4 5.4.4 8-.6 1.7-1 4-1.5 5.6-.3 1-1.6 1-1.9 0l-1-3.4c-.4-1.1-2-1.1-2.4 0l-1 3.4c-.3 1-1.6 1-1.9 0-.5-1.6-.9-3.9-1.5-5.6-1-2.6-1.8-6.2.4-8Z"
        />
      );
  }
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}
