import type { SVGProps } from 'react';

export const PulseLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 28" fill="none" aria-label="OpsPulse" {...props}>
    <rect width="28" height="28" rx="8" fill="url(#g)" />
    <path d="M7 15h5l2.2-6 3.5 10 2.4-4H24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="36" y="19" fill="currentColor" fontSize="14" fontWeight="700">OpsPulse</text>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#3B6CFF" />
        <stop offset="1" stopColor="#7F56D9" />
      </linearGradient>
    </defs>
  </svg>
);

export const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" fill="currentColor"/></svg>
);

export const ShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 2 4 5v6c0 5.25 3.4 10.16 8 11.77 4.6-1.6 8-6.52 8-11.77V5l-8-3Z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
);

export const BillingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.8"/><circle cx="17" cy="15" r="1.5" fill="currentColor"/></svg>
);
