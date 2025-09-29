import LogoutButton from "@/components/LogoutButton";
import BlockOutTimes from "@/components/admin/BlockOutTimes";
import ShowEvents from "@/components/admin/ShowEvents";

export default function AdminPage() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-auto place-items-center w-full">
        <div className="w-full h-fit flex justify-between items-center border-b-2 border-blue-600 p-4">
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-2xl md:text-3xl">Admin Dashboard</h1>
            <p className="text-sm md:text-lg">Welcome, {process.env.ADMIN_EMAIL}</p>
          </div>
          <LogoutButton />
        </div>
        <div className="admin-dashboard-container">
          <h1 className="text-2xl md:text-3xl font-bold py-2">Appointment management</h1>
          <div className="flex flex-col items-center justify-center">
            <ShowEvents />
          </div>
          <div>
            <BlockOutTimes />
          </div>
        </div>
        <div className="admin-dashboard-container">
          <h1 className="text-2xl">Business Settings</h1>
        </div>
        <div className="admin-dashboard-container">
          <h1 className="text-2xl">Notification Settings</h1>
        </div>
      </div>
    </>
  );
}
