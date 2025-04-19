import {Outlet, useLocation} from "react-router-dom";
import {AdminSidebar} from "./AdminSideBar";

const pathToTitle = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/performance": "Performance",
    "/rooms": "Rooms",
};

export default function AdminLayout() {
    const location = useLocation();
    const title = pathToTitle[location.pathname] || "Page";

    return (
        <div className="flex h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
