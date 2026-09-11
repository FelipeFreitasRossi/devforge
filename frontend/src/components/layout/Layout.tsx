import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-16 md:pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}