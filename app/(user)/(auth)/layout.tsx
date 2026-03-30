import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="page-shell section-shell flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-zinc-50 shadow-lg lg:grid-cols-[1fr_1fr]">
        <div className="hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-indigo-700 p-10 text-zinc-100 lg:flex lg:flex-col lg:justify-end">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
            Fashion Haven
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">
            Premium style starts with your account.
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Save your picks, track every order, and stay ready for exclusive
            drops.
          </p>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </main>
  );
}
