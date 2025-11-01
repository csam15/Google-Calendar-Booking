import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="login-button">
      <Link href="/login">
        <LogIn className="size-8" />
      </Link>
    </div>
  );
}
