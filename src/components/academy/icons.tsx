/** Small hand-drawn-feel line icons for the Quillmark Academy demo. Decorative only. */
import type {SVGProps} from 'react';

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function QuillMark(props: P) {
  return (
    <svg {...base} viewBox="0 0 32 32" {...props}>
      <path d="M26.5 4.5c-7.5 1.2-13.6 6.8-16 14.6l-1.6 5.3 4-3.6c6.8-1 11.6-6.6 13.6-16.3Z" fill="currentColor" stroke="none" opacity="0.18" />
      <path d="M26.5 4.5c-7.5 1.2-13.6 6.8-16 14.6l-1.6 5.3 4-3.6c6.8-1 11.6-6.6 13.6-16.3Z" />
      <path d="M8.9 24.4 6 28" />
      <path d="M13 20.8c2.3-4.7 5.6-8.6 9.6-11.6" />
      <path d="M17 27.5c2.2-.9 4.4-.9 6.6 0" />
    </svg>
  );
}

export function UsersIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.8 13.6c2.4-.3 4.2 1.2 4.7 4.2" />
    </svg>
  );
}

export function PencilIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1-4.2L15.6 5.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20Z" />
      <path d="M13.8 7l3.2 3.2" />
    </svg>
  );
}

export function CompassIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5 13.3 13.3 8.5 15.5l2.2-4.8 4.8-2.2Z" />
    </svg>
  );
}

export function BookIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5C6.5 4.5 9.5 4.6 12 6.2v13c-2.5-1.6-5.5-1.7-8-.7v-13Z" />
      <path d="M20 5.5c-2.5-1-5.5-.9-8 .7v13c2.5-1.6 5.5-1.7 8-.7v-13Z" />
    </svg>
  );
}

export function ChatIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 6.5c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v7.5c0 1.1-.9 2-2 2H10l-4.5 3.5V16h-1v-9.5Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </svg>
  );
}

export function FolderIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5c0-1.1.9-2 2-2h4l2 2h7c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-13c-1.1 0-2-.9-2-2v-10Z" />
      <path d="M8 13.5h8" />
    </svg>
  );
}

export function ClockIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h13M13 7l5 5-5 5" />
    </svg>
  );
}

export function SearchIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

/** A loose hand-drawn underline used under one word of the hero heading. */
export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 220 18" fill="none" aria-hidden focusable={false} preserveAspectRatio="none" {...props}>
      <path
        d="M3 12c22-6 44-8 66-5 18 2.4 30 6.3 50 4.4 22-2 40-8.5 62-7.4 14 .7 24 3.4 36 6"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
