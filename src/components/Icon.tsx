import type { CSSProperties } from "react";
const paths: Record<string, React.ReactNode> = {
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
  moon: <path d="M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z"/>,
  phone: <path d="M22 17v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.7-3.1 20 20 0 0 1-6-6A20 20 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .3 2 .6 3 .7A2 2 0 0 1 22 17Z"/>,
  arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
  external: <><path d="M14 3h7v7M21 3l-11 11" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
  code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 7h5m-5 10h5"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/></>,
  pen: <><path d="m16 3 5 5-11 11-7 2 2-7L16 3ZM13 6l5 5"/></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6"/></>,
  github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2 4-.5 7-2 7-6 0-2-.7-3-2-4 .3-1 .3-2 0-3-2 0-3 1-4 2-2-.5-4-.5-6 0C8 4 7 3 5 3c-.3 1-.3 2 0 3-1.3 1-2 2-2 4 0 4 3 5.5 7 6-1 0-1 1-1 2v4"/></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10h.01M11 17v-7m0 3c0-4 6-4 6 0v4"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></>,
  x: <><path d="M4 3h4l12 18h-4L4 3Z"/><path d="M20 3 4 21"/></>,
  facebook: <path d="M14 22v-9h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v9"/>,
  whatsapp: <><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.5A9 9 0 1 1 21 11.5Z"/><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 1c0 2-2 3-4 2-3-1-6-4-7-7-.5-2 .5-3 2-3Z"/></>,
  check: <path d="m5 12 4 4L19 6"/>
};
export function Icon({ name, style }: { name: string; style?: CSSProperties }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name] || paths.code}</svg>;
}
