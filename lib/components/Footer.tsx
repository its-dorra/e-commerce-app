import {
  amexIcon,
  footerLogo,
  githubIcon,
  instagramIcon,
  mastercardIcon,
  visaIcon,
  youtubeIcon,
} from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="about"
      className="mt-16 w-full border-t border-stone-800 bg-stone-900 text-stone-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <div className="brightness-200 invert filter">
              <Image src={footerLogo} alt="Fashion Haven" />
            </div>
            <div className="font-body space-y-1.5 text-sm leading-relaxed text-stone-400">
              <p>
                Curated fashion essentials for the discerning modern wardrobe.
              </p>
              <p>
                Elevated basics, seasonal limited drops, and enduring elegance.
              </p>
            </div>
            <div className="flex items-center gap-x-4 pt-2">
              <span className="cursor-pointer rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white">
                <Image
                  src={githubIcon}
                  alt="GitHub"
                  className="opacity-80 invert filter transition-opacity hover:opacity-100"
                />
              </span>
              <span className="cursor-pointer rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white">
                <Image
                  src={instagramIcon}
                  alt="Instagram"
                  className="opacity-80 invert filter transition-opacity hover:opacity-100"
                />
              </span>
              <span className="cursor-pointer rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white">
                <Image
                  src={youtubeIcon}
                  alt="YouTube"
                  className="opacity-80 invert filter transition-opacity hover:opacity-100"
                />
              </span>
            </div>
          </div>

          <div className="font-body grid grid-cols-2 gap-8 text-sm md:col-span-2 md:grid-cols-3">
            <div className="space-y-4">
              <p className="font-display text-base font-semibold uppercase tracking-wider text-amber-500/90">
                Support
              </p>
              <ul className="space-y-2.5 text-stone-400">
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  FAQ
                </li>
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  Terms of use
                </li>
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  Privacy policy
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-display text-base font-semibold uppercase tracking-wider text-amber-500/90">
                Maison
              </p>
              <ul className="space-y-2.5 text-stone-400">
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  About us
                </li>
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  Contact
                </li>
                <li className="cursor-pointer transition-colors hover:text-amber-400">
                  Careers
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-display text-base font-semibold uppercase tracking-wider text-amber-500/90">
                Collections
              </p>
              <div className="space-y-2.5 text-stone-400">
                <Link
                  href="/account"
                  className="block transition-colors hover:text-amber-400"
                >
                  My Account
                </Link>
                <Link
                  href="/checkout"
                  className="block transition-colors hover:text-amber-400"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  className="block transition-colors hover:text-amber-400"
                >
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800/80 pt-8 sm:flex-row">
          <p className="font-body text-xs text-stone-400">
            © 2026 Fashion Haven. All rights reserved.
          </p>
          <div className="flex items-center gap-x-3 opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
            <Image src={mastercardIcon} alt="Mastercard" />
            <Image src={amexIcon} alt="Amex" />
            <Image src={visaIcon} alt="Visa" />
          </div>
        </div>
      </div>
    </footer>
  );
}
