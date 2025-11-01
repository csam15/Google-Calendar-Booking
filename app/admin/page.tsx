import LogoutButton from "@/components/LogoutButton";
import BlockOutTimes from "@/components/admin/BlockOutTimes";
import ShowEvents from "@/components/admin/ShowEvents";
import { siteConfig } from "@/config/site";

export default function AdminPage() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-auto place-items-center w-full">
        <div className="w-full h-fit flex justify-between items-center border-b-2 p-4 admin-header">
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-2xl md:text-3xl">{siteConfig.text.admin.dashboardTitle}</h1>
            <p className="text-sm md:text-lg">Welcome, {process.env.ADMIN_EMAIL}</p>
          </div>
          <LogoutButton />
        </div>
        <div className="admin-dashboard-container">
          <h1 className="admin-section-title">{siteConfig.text.admin.appointmentManagementTitle}</h1>
          <div className="flex flex-col items-center justify-center">
            <ShowEvents />
          </div>
          <div>
            <BlockOutTimes />
          </div>
        </div>
        <div className="admin-dashboard-container">
          <h1 className="admin-section-title">{siteConfig.text.admin.businessSettingsTitle}</h1>
          <p className="text-muted">{siteConfig.text.admin.placeholderText}</p>
        </div>
        <div className="admin-dashboard-container">
          <h1 className="admin-section-title">{siteConfig.text.admin.notificationSettingsTitle}</h1>
          <p className="text-muted">{siteConfig.text.admin.placeholderText}</p>
        </div>
      </div>
    </>
  );
}
