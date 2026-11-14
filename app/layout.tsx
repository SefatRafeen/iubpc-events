import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IUBPC — Events & Wings 3D Folio Archive',
  description:
    'An interactive 3D archival folio of every event and specialized wing of the IUB Programming Club (IUBPC), featuring physical 3D shelf geometry and ink-bleed detail posters.',
  openGraph: {
    title: 'IUBPC — Events & Wings 3D Folio Archive',
    description:
      'An interactive 3D archival folio of every event and specialized wing of the IUB Programming Club (IUBPC), featuring physical 3D shelf geometry and ink-bleed detail posters.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IUBPC — Events & Wings 3D Folio Archive',
    description:
      'An interactive 3D archival folio of every event and specialized wing of the IUB Programming Club (IUBPC), featuring physical 3D shelf geometry and ink-bleed detail posters.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning className="iubpc-grid-bg">
        {children}
      </body>
    </html>
  );
}
