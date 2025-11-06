import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-5xl py-6">{siteConfig.text.home.welcomeTitle}</h1>
      <Link href="/book" className="primary-button">
        {siteConfig.text.home.bookingLinkText}
      </Link>
    </div>
  );
}
