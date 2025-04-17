// components/layout/MainLayout.jsx
import Header from "components/layout/Header/Header";
import Sidebar from "components/layout/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const pathToTitle = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings",
    "/admin": "Admin",
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
          {/*<Header title={title} />*/}
  
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
//             <Header title={title}/>
//             <Sidebar />
//             {/* <main>{children}</main> */}
//             <main>
//                 <Outlet />
//             </main>
//         </>
//     );
// }

