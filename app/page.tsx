import Link from "next/link";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="self-end">

      <LoginButton />
      </div>
      <h1 className="text-5xl py-6">Home page</h1>
      <Link href="/book" className="border p-2 rounded-2xl hover:bg-black hover:text-white">Click here to book an appointment</Link>
    </div>
  );
}
