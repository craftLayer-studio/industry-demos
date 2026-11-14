import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement>;

function base(props: P) {
  return {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...props,
  };
}

export function BagIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M6 7h12l1 13H5z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export function PlusIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  );
}

export function ArrowRightIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Brightwater mark: a coffee bean inside a ripple ring. */
export function BrandMark(props: P) {
  return (
    <svg width={34} height={34} viewBox="0 0 40 40" aria-hidden focusable={false} {...props}>
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="20" cy="20" rx="9" ry="12.5" fill="currentColor" transform="rotate(28 20 20)" />
      <path d="M24.5 9.6 C17 15 25 24 15.5 30.4" stroke="#1A100B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
