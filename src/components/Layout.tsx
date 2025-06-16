
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-6">
          <div className="mb-4 lg:hidden">
            <SidebarTrigger className="mb-4" />
          </div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
