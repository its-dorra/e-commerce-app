import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="page-shell section-shell flex min-h-[calc(100vh-10rem)] items-center justify-center py-6">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xl lg:grid-cols-[1.1fr_1fr]">
        <div className="relative hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-900 p-12 text-stone-100 lg:flex lg:flex-col lg:justify-end">
          <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-amber-600/10 blur-2xl" />
          <div className="relative z-10 space-y-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Maison Member
            </span>
            <h2 className="font-display text-3xl font-normal leading-tight text-white">
              Understated luxury begins with your account.
            </h2>
            <p className="font-body text-xs font-light leading-relaxed text-stone-300">
              Curate your personal wishlist, track bespoke orders, and receive
              private previews of seasonal arrivals.
            </p>
          </div>
        </div>
        <div className="p-8 md:p-12">{children}</div>
      </div>
    </main>
  );
}
