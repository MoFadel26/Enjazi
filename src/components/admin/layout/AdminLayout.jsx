import {Outlet, useLocation} from "react-router-dom";
import {AdminSidebar} from "./AdminSideBar";

export default function AdminLayout() {
    const location = useLocation();

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
