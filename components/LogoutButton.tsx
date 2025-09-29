"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className=" rounded-xl border-1 p-2 hover:bg-red-900 cursor-pointer"
      >
        <LogOut className="size-8" />
      </button>
    </div>
  );
}
