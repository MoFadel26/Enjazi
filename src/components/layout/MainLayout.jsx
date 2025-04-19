// components/layout/MainLayout.jsx
import Header from "components/layout/header/Header";
import Sidebar from "components/layout/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const pathToTitle = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/performance": "Performance",
    "/rooms": "Rooms",
  };

  export default function MainLayout() {
    const location = useLocation();
    const title = pathToTitle[location.pathname] || "Page";
  
    return (
      <div className="flex h-screen">
        <Sidebar />
  
        <div className="flex flex-col flex-1 overflow-hidden">
          {/*<header title={title} />*/}
  
          <main className="p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

// export default function MainLayout({ children }) {
//     const location = useLocation();
//     const title = pathToTitle[location.pathname] || 'Page'
//     return (
//         <>
//             <header title={title}/>
//             <sidebar />
//             {/* <main>{children}</main> */}
//             <main>
//                 <Outlet />
//             </main>
//         </>
//     );
// }

