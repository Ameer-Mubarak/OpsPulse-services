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

export const WorkflowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 6h9M4 12h5m-5 6h9m7-9v9m0-9-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 4a6 6 0 0 0-6 6v4l-2 2h16l-2-2v-4a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.8"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
);


export const ForecastIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 18h16M6 15l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export const ShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 2 4 5v6c0 5.25 3.4 10.16 8 11.77 4.6-1.6 8-6.52 8-11.77V5l-8-3Z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
);


export const CopilotIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M8 7a4 4 0 1 1 8 0v3a4 4 0 0 1-8 0V7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M6 18h12M9 15.5v2.5m6-2.5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
);


export const GovernanceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 3 4 7v5c0 4.6 3.1 8.9 8 10 4.9-1.1 8-5.4 8-10V7l-8-4Z" stroke="currentColor" strokeWidth="1.8"/><path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
);

export const BillingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.8"/><circle cx="17" cy="15" r="1.5" fill="currentColor"/></svg>
);
