import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="rounded-xl border-1 p-2 hover:bg-blue-300 cursor-pointer">
      <Link href="/login">
        <LogIn className="size-8" />
      </Link>
    </div>
  );
}
