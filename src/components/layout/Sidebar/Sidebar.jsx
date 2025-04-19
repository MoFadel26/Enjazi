// src/components/layout/Sidebar/Sidebar.jsx
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, CheckSquare, Calendar, BarChart2, Users, Settings, HelpCircle, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "../../../contexts/ThemeContext" // Add this import

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { isDark } = useTheme() // Add this line

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Performance",
      href: "/performance",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      name: "Rooms",
      href: "/rooms",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className={`md:hidden fixed top-4 left-4 z-50 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } p-2 rounded-md shadow-md`} 
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 
          ${isDark 
            ? 'bg-gray-900 border-r border-gray-700 text-white' 
            : 'bg-white border-r border-[#e2e8f0] text-gray-800'
          } 
          shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className={`p-7 ${isDark ? 'border-b border-gray-700' : 'border-b border-[#e2e8f0]'} flex items-center`}>
            <div className="bg-[#f97316] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold">E</span>
            </div>
            <Link to="/dashboard" className={`${isDark ? 'text-white' : 'text-[#0f172a]'} text-xl font-bold`}>
              Enjazi
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center px-4 py-3 rounded-md transition-colors
                        ${
                          isActive
                            ? isDark 
                              ? "bg-gray-800 text-[#07b0ed]" 
                              : "bg-[#f0f9ff] text-[#07b0ed]"
                            : isDark 
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                              : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                        }
                      `}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className={`p-4 ${isDark ? 'border-t border-gray-700' : 'border-t border-[#e2e8f0]'}`}>
            <Link
              to="/help"
              className={`
                flex items-center px-4 py-3 rounded-md transition-colors
                ${isDark 
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                }
              `}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="ml-3">Help desk</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}