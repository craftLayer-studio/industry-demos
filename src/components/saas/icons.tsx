import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function PulseMark(props: P) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="M3 13h4l2.5-6 4 11 2.5-7H21" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function DashIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M7 12h10" />
    </svg>
  );
}

export function ArrowRightIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CodeIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </svg>
  );
}

export function TargetIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function InboxIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13.5 6.2 6h11.6l2.2 7.5V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 13.5h4.5l1 2h5l1-2H20" />
    </svg>
  );
}

export function DeviceIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="13" height="10" rx="1.5" />
      <rect x="16.5" y="9" width="4.5" height="10" rx="1.2" />
      <path d="M7 19h6" />
    </svg>
  );
}

export function ServerIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </svg>
  );
}

export function DatabaseIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </svg>
  );
}

export function ChatIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function TicketIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
      <path d="M10 7v10" strokeDasharray="1.5 2" />
    </svg>
  );
}

export function FlagIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export function WebhookIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <circle cx="12" cy="7" r="2.5" />
      <path d="M10.8 9.2 8 14.8M13.2 9.2 16 14.8M9.5 17h5" />
    </svg>
  );
}

export function ShieldIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function LockIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="1.8" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function EyeOffIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M3 3l18 18M10.6 6.1A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.8-1.3 2.4-2.9 3.8M6.2 7.6C4.4 8.9 3.3 10.7 3 12c.5 1.5 4 6 9 6 1.4 0 2.7-.3 3.8-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function KeyIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2" />
    </svg>
  );
}

export function TrashIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

export function GlobeIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5s1.1-5.9 3.6-8.5z" />
    </svg>
  );
}
