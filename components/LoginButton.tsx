import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="fixed right-5 top-5 rounded-xl border-1 p-2 hover:bg-blue-300 cursor-pointer">
      <Link href="/login">
        <LogIn className="size-10" />
      </Link>
    </div>
  );
}
