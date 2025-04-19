import { NavLink } from "react-router-dom";
import { BarChart3, Users, FileText, AlertCircle, Settings, Shield, Home, LogOut } from "lucide-react";
import { cn } from "lib/utils";
import { Button } from "components/ui/Button";
// import { useTheme } from "@/components/theme-provider";

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
    {
        label: "System Monitoring",
        icon: AlertCircle,
        href: "/admin/monitoring",
        color: "text-orange-500",
    },
    {
        label: "Role Management",
        icon: Shield,
        href: "/admin/roles",
        color: "text-emerald-500",
    },
];

export function AdminSidebar() {
    // const { theme } = useTheme();

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
                    <NavLink to="/dashboard">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-muted-foreground hover:text-foreground"
                        >
                            <Home className="mr-3 h-5 w-5" />
                            Back to App
                        </Button>
                    </NavLink>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

