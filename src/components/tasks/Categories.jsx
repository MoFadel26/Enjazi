import React from "react";
import {Book, Dumbbell , House, Briefcase, CodeXml, Coffee, ListFilter} from "lucide-react";

export function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className=" mt-4 ml-4 lg:block w-64 bg-white border rounded-md mb-4">
      <div className="px-4 py-4">
        {/* Views */}
        <h2 className="text-md mb-4 font-bold">Categories</h2>
        <div className="-mx-4 mb-3 mt-3">
          <hr className="border-t border-[#e2e8f0]" />
        </div>
        <ul className=" text-gray-600 text-sm space-y-2ou gap-3">
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "All"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("All")}
          >
            <ListFilter className="w-4 h-4" />
            All Categories
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Work"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Work")}
          >
            <Briefcase className="w-4 h-4 text-[#3366FF]" />
            Work
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Personal"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Personal")}
          >
            <House className="w-4 h-4 text-[#FF5EE7]" />
            Personal
          </li>

          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Health"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Health")}
          >
            <Dumbbell className="w-4 h-4 text-[#FF5E5E]" />
            Health
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Education"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Education")}
          >
            <Book className="w-4 h-4 text-[#00B894]" />
            Education
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Code"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Code")}
          >
            <CodeXml className="w-4 h-4 text-[#9B59B6]" />
            Code
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left cursor-pointer
              ${
                selectedCategory === "Social"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedCategory("Social")}
          >
            <Coffee className="w-4 h-4 text-[#FFB700]" />
            Social
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;