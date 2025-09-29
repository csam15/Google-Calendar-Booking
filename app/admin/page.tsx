import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  return (
    <div className="p-6">
      <LogoutButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
      </div>

    </div>
  );
}
