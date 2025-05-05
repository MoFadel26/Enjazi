import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Users, FileText, AlertCircle, Settings, Shield, Home, LogOut } from "lucide-react";
import { cn } from "lib/utils";
import { Button } from "components/ui/Button";
import Cookies from "js-cookie"; // Import js-cookie library
import axios from "axios";

const adminRoutes = [
    {
        label: "User Management",
        icon: Users,
        href: "/admin/users",
        color: "text-violet-500",
    },
    {
        label: "Room Management",
        icon: Users,
        href: "/admin/rooms",
        color: "text-green-500",
    },
];

export function AdminSidebar() {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = async () => {
        try {
            // Clear local storage tokens if any
            // localStorage.removeItem("authToken");
            
            // Make a request to the server to clear HTTP-only cookies
            // This is the most reliable way to clear HTTP-only cookies
            await axios.post('/api/auth/logout');
            
            // Force clear any client-accessible cookies including potential non-httpOnly duplicates
            // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; sameSite=strict";
            // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; sameSite=strict";
            
            // Redirect to login page
            navigate("/login");
            
            // Optional: force reload to clear any state
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
            // Still redirect even if the server request fails
            navigate("/login");
        }
    };

    return (
        <div className="h-full w-64 border-r bg-card flex flex-col">
            <div className="p-6">
                <NavLink to="/admin" className="flex items-center gap-2 font-bold text-2xl">
                    <span className="text-primary">Enjazi</span>
                    <span className="text-muted-foreground">Admin</span>
                </NavLink>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="flex flex-col gap-1 px-2">
                    {adminRoutes.map((route) => (
                        <NavLink
                            key={route.href}
                            to={route.href}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )
                            }
                        >
                            <route.icon className={cn("h-5 w-5", route.color)} />
                            {route.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="p-6 border-t bg-muted/20 dark:bg-muted/10">
                <div className="flex flex-col gap-3">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                        onClick={handleLogout} // Attach logout handler
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

