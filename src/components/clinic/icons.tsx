import type {SVGProps} from 'react';

/** Line icons drawn for the Northstar Clinic demo (24px grid, currentColor). */
type P = SVGProps<SVGSVGElement>;

function Base({children, ...props}: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}>
      {children}
    </svg>
  );
}

export function NorthstarMark(props: P) {
  return (
    <Base {...props}>
      <path d="M12 2.75 13.9 10.1 21.25 12 13.9 13.9 12 21.25 10.1 13.9 2.75 12 10.1 10.1Z" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function FamilyIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M12 17.25s-3-1.7-3-3.75a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2.05-3 3.75-3 3.75Z" />
    </Base>
  );
}

export function ChildIcon(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="M10 8.5h.01M14 8.5h.01" />
      <path d="M10.25 10.75c.9.8 2.6.8 3.5 0" />
      <path d="M12 4c0-1 .8-1.5 1.75-1.25" />
      <path d="M6.5 21c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
    </Base>
  );
}

export function SkinIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M12 3.25s-5.5 6.1-5.5 10.25a5.5 5.5 0 0 0 11 0C17.5 9.35 12 3.25 12 3.25Z" />
      <path d="M9.5 14.25a2.5 2.5 0 0 0 2.5 2.5" />
    </Base>
  );
}

export function HeartIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.25 4.25 0 0 1 12 7.4 4.25 4.25 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
      <path d="M6.5 12.5h3l1.25-2 2 4 1.25-2h3.5" />
    </Base>
  );
}

export function MovementIcon(props: P) {
  return (
    <Base {...props}>
      <circle cx="13.5" cy="4.5" r="1.75" />
      <path d="m9 21 2.5-6 3 2.5V21" />
      <path d="M7 11.5 10 8.5h4l2.5 3.5 2.5.5" />
      <path d="m11.5 15 1-6.5" />
    </Base>
  );
}

export function BloomIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M12 20.5v-6" />
      <path d="M12 14.5c-3.6 0-6-2.6-6-6.25 2.6 0 4.8 1.2 6 3.25 1.2-2.05 3.4-3.25 6-3.25 0 3.65-2.4 6.25-6 6.25Z" />
      <path d="M12 11.5C10.8 9.6 10.75 6 12 3.5c1.25 2.5 1.2 6.1 0 8Z" />
    </Base>
  );
}

export function CheckCircleIcon(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.25 12.25 2.5 2.5 5-5.25" />
    </Base>
  );
}

export function PhoneIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M5 4h3.5l1.5 4-2 1.25a11 11 0 0 0 6.75 6.75L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
    </Base>
  );
}

export function MailIcon(props: P) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.75 7 8.25 6 8.25-6" />
    </Base>
  );
}

export function PinIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </Base>
  );
}

export function ClockIcon(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  );
}

export function ArrowRightIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function ShieldIcon(props: P) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5.5c0 4.3 3 7.9 7 9.5 4-1.6 7-5.2 7-9.5V6l-7-3Z" />
      <path d="M12 8.5v4M12 15.5h.01" />
    </Base>
  );
}
