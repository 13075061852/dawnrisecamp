import type { SVGProps } from "react";

export function MountainMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 40" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M2 34 18 12l8 10L37 4l25 30h-8L38 14 27 28l-8-10L10 34H2Zm20 0 7-9 5 6 4-5 7 8H22Z"
      />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M5 12h14m-6-6 6 6-6 6"
      />
    </svg>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="m9 6 6 6-6 6"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="m15 6-6 6 6 6"
      />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path fill="currentColor" d="m15.8 8.2-2 5.6-5.6 2 2-5.6 5.6-2Z" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="M12 3.5 19 6v5.2c0 4.1-2.5 7.5-7 9.3-4.5-1.8-7-5.2-7-9.3V6l7-2.5Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="m8.8 12 2.1 2.1 4.5-5"
      />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        d="M3.5 12h17M12 3.5c2.7 2.7 4.1 5.5 4.1 8.5s-1.4 5.8-4.1 8.5c-2.7-2.7-4.1-5.5-4.1-8.5S9.3 6.2 12 3.5Z"
      />
    </svg>
  );
}
