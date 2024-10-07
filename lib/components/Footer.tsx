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
    <footer className="grid w-full max-w-[850px] grid-cols-1 justify-between gap-12 place-self-center py-12 md:grid-cols-[auto_auto_auto]">
      <div className="space-y-4">
        <Image src={footerLogo} alt="logo" />
        <div className="tracking-wide text-black/70">
          <p className="text-sm">A place where you can</p>
          <p className="text-sm">find the perfect clothes</p>
        </div>
        <div className="flex items-center gap-x-4">
          <Image src={githubIcon} alt="" />
          <Image src={instagramIcon} alt="" />
          <Image src={youtubeIcon} alt="" />
        </div>
      </div>
      <div className="flex gap-x-12 text-sm md:justify-between">
        <div className="space-y-4">
          <p className="mb-10 uppercase text-black/60">support</p>
          <p>FAQ</p>
          <p>Terms of use</p>
          <p>Privacy policy</p>
        </div>
        <div className="space-y-4">
          <p className="mb-10 uppercase text-black/60">company</p>
          <p>About us</p>
          <p>Contact</p>
          <p>Carrers</p>
        </div>
        <div className="space-y-4">
          <p className="mb-10 uppercase text-black/60">shop</p>
          <Link href="#" className="block">
            My Account
          </Link>
          <Link href="#" className="block">
            Checkout
          </Link>
          <Link href="#" className="block">
            Cart
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-black/60">
          accepted payments
        </p>
        <div className="flex items-center gap-x-3">
          <Image src={mastercardIcon} alt="mastercard" />
          <Image src={amexIcon} alt="amex card" />
          <Image src={visaIcon} alt="visa card" />
        </div>
      </div>
    </footer>
  );
}
