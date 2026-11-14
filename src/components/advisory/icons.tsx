import type {SVGProps} from 'react';

/** Small inline SVGs rendered directly (Astryx's icon set has no arrow-right). */
export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

export function Tick(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="square" />
    </svg>
  );
}
