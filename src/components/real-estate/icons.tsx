import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

/** Ashgrove mark: a gabled arch with a single ash leaf. */
export function AshgroveMark(props: P) {
  return (
    <svg {...base} viewBox="0 0 32 32" strokeWidth={1.8} {...props}>
      <path d="M5 28V13L16 4l11 9v15" />
      <path d="M11 28V19a5 5 0 0 1 10 0v9" />
      <path d="M16 23c0-3 1.5-5 4-6" />
      <path d="M3 28h26" />
    </svg>
  );
}

export function BedIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18V7M21 18v-5a3 3 0 0 0-3-3h-7v6" />
      <path d="M3 15h18M3 18h18" />
      <circle cx="7" cy="11.5" r="1.8" />
    </svg>
  );
}

export function BathIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M6 12V6a2 2 0 0 1 3.6-1.2" />
      <path d="M7 19l-1 2M17 19l1 2" />
    </svg>
  );
}

export function AreaIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M4 10h7v10M11 14h9" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HouseSearchIcon(props: P) {
  return (
    <svg {...base} width={40} height={40} strokeWidth={1.2} {...props}>
      <path d="M3 20V10l7-6 7 6v3" />
      <path d="M7 20v-5h4" />
      <circle cx="16.5" cy="16.5" r="3" />
      <path d="M18.7 18.7 21 21" />
    </svg>
  );
}
