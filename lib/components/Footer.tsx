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
      className="mx-auto mt-12 w-full max-w-7xl px-4 pb-12 md:px-6"
    >
      <div className="section-muted grid grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[1.1fr_1fr_1fr] md:px-10">
        <div className="space-y-5">
          <Image src={footerLogo} alt="logo" />
          <div className="space-y-1 text-zinc-600">
            <p className="text-sm">
              Curated fashion essentials for modern wardrobes.
            </p>
            <p className="text-sm">
              Elevated basics, seasonal drops, and timeless style.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Image src={githubIcon} alt="GitHub" />
            <Image src={instagramIcon} alt="Instagram" />
            <Image src={youtubeIcon} alt="YouTube" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:col-span-2 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Support
            </p>
            <p className="text-zinc-700">FAQ</p>
            <p className="text-zinc-700">Terms of use</p>
            <p className="text-zinc-700">Privacy policy</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Company
            </p>
            <p className="text-zinc-700">About us</p>
            <p className="text-zinc-700">Contact</p>
            <p className="text-zinc-700">Careers</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Shop
            </p>
            <Link href="/account" className="block text-zinc-700">
              My Account
            </Link>
            <Link href="/checkout" className="block text-zinc-700">
              Checkout
            </Link>
            <Link href="/cart" className="block text-zinc-700">
              Cart
            </Link>
          </div>
        </div>

        <div className="space-y-4 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Accepted payments
          </p>
          <div className="flex items-center gap-x-3">
            <Image src={mastercardIcon} alt="mastercard" />
            <Image src={amexIcon} alt="amex card" />
            <Image src={visaIcon} alt="visa card" />
          </div>
        </div>
      </div>
    </footer>
  );
}
