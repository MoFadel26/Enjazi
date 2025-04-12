import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"
import PropTypes from 'prop-types'

export default function PageHeader({ 
  title = "Page", 
  description = "", 
  showSearch = true, 
  showFilter = true, 
  showCreate = true, 
  createButtonText = "Create" 
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="bg-white border-b border-[#e2e8f0] p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">{title}</h1>
          {description && <p className="text-[#64748b]">{description}</p>}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-[#94a3b8]" />
              </div>
              <input
                type="text"
                className="bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-md focus:ring-[#07b0ed] focus:border-[#07b0ed] block w-full pl-10 p-2.5"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {showFilter && (
            <button
              className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
              title={`Filter ${title}`}
            >
              <Filter className="w-4 h-4" />
            </button>
          )}

          {showCreate && (
            <button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-1 bg-[#07b0ed] hover:bg-[#07b0ed]/90 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">{createButtonText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  showSearch: PropTypes.bool,
  showFilter: PropTypes.bool,
  showCreate: PropTypes.bool,
  createButtonText: PropTypes.string
} 