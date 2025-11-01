import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="self-end">
        <LoginButton />
      </div>
      <h1 className="text-5xl py-6">{siteConfig.text.home.welcomeTitle}</h1>
      <Link href="/book" className="primary-button">
        {siteConfig.text.home.bookingLinkText}
      </Link>
    </div>
  );
}
