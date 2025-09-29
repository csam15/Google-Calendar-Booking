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
    <div className="fixed top-5 right-5">
      <button
        onClick={handleLogout}
        className="fixed right-5 top-5 rounded-xl border-1 p-2 hover:bg-red-300 cursor-pointer"
      >
        <LogOut className="size-8" />
      </button>
    </div>
  );
}
