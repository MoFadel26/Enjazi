// components/layout/MainLayout.jsx
import Header from "components/layout/Header/Header";
import Sidebar from "components/layout/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const pathToTitle = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings",
    "/admin": "Admin",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/rooms": "Rooms",
  };

export default function MainLayout({ children }) {
    const location = useLocation();
    const title = pathToTitle[location.pathname] || 'Page'
    return (
        <>
            <Header title={title}/>
            <Sidebar />
            <main>{children}</main>
        </>
    );
}