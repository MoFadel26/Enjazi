import React from "react";
import {Book, Dumbbell , House, Briefcase, CodeXml, Coffee} from "lucide-react";

export function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="lg:block w-64 bg-white border">
        <div className="px-6 py-6">
        {/* Views */}
        <h2 className="text-sm mb-4 font-bold text-gray-400">Views</h2>
        <ul className="mb-5 text-gray-600 text-sm space-y-2ou gap-3">
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Work"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Work")}
          >
            <Briefcase />
            Work
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Personal"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Personal")}
          >
            <House />
            Personal
          </li>

          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Health"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Health")}
          >
            <Dumbbell />
            Health
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Education"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Education")}
          >
            <Book />
            Education
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Code"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Code")}
          >
            <CodeXml />
            Code
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedCategory === "Social"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Social")}
          >
            <Coffee />
            Social
          </li>
        </ul>
      </div>
    </aside>
  );
}