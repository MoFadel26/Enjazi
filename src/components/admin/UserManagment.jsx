// "use client"
//
// import { useState } from "react"
// import { Search, Filter, UserPlus, MoreHorizontal, Edit, Trash2, Shield, Mail, Download } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"
// import { UserDialog } from "@/components/admin/user-dialog"
//
// // Mock data for users
// const mockUsers = Array.from({ length: 100 }, (_, i) => ({
//     id: i + 1,
//     name: `User ${i + 1}`,
//     email: `user${i + 1}@example.com`,
//     avatar: `/placeholder.svg?height=40&width=40`,
//     initials: `U${i + 1}`,
//     role: i % 20 === 0 ? "admin" : i % 10 === 0 ? "moderator" : "user",
//     status: i % 15 === 0 ? "suspended" : i % 7 === 0 ? "inactive" : "active",
//     createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
//     lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
// }))
//
// export function UserManagement() {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [roleFilter, setRoleFilter] = useState("all")
//     const [statusFilter, setStatusFilter] = useState("all")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//     const [selectedUser, setSelectedUser] = useState<any>(null)
//
//     const itemsPerPage = 10
//
//     // Filter users based on search query and filters
//     const filteredUsers = mockUsers.filter((user) => {
//         const matchesSearch =
//             user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchQuery.toLowerCase())
//
//         const matchesRole = roleFilter === "all" || user.role === roleFilter
//         const matchesStatus = statusFilter === "all" || user.status === statusFilter
//
//         return matchesSearch && matchesRole && matchesStatus
//     })
//
//     // Paginate users
//     const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//
//     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
//
//     const handleEditUser = (user: any) => {
//         setSelectedUser(user)
//         setIsEditDialogOpen(true)
//     }
//
//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm">
//                         <Download className="mr-2 h-4 w-4" />
//                         Export
//                     </Button>
//                     <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
//                         <UserPlus className="mr-2 h-4 w-4" />
//                         Add User
//                     </Button>
//                 </div>
//             </div>
//
//             <Card>
//                 <CardHeader className="pb-3">
//                     <CardTitle>Users</CardTitle>
//                     <CardDescription>Manage user accounts, roles, and permissions.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex flex-col gap-4">
//                         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                             <div className="flex w-full max-w-sm items-center space-x-2">
//                                 <Input
//                                     placeholder="Search users..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="h-9"
//                                 />
//                                 <Button variant="outline" size="sm" className="h-9 px-3">
//                                     <Search className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                             <div className="flex flex-col gap-2 sm:flex-row">
//                                 <div className="flex items-center gap-2">
//                                     <Filter className="h-4 w-4 text-muted-foreground" />
//                                     <Select value={roleFilter} onValueChange={setRoleFilter}>
//                                         <SelectTrigger className="h-9 w-[130px]">
//                                             <SelectValue placeholder="Role" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="all">All Roles</SelectItem>
//                                             <SelectItem value="admin">Admin</SelectItem>
//                                             <SelectItem value="moderator">Moderator</SelectItem>
//                                             <SelectItem value="user">User</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                                     <SelectTrigger className="h-9 w-[130px]">
//                                         <SelectValue placeholder="Status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="all">All Status</SelectItem>
//                                         <SelectItem value="active">Active</SelectItem>
//                                         <SelectItem value="inactive">Inactive</SelectItem>
//                                         <SelectItem value="suspended">Suspended</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>
//
//                         <div className="rounded-md border">
//                             <div className="relative w-full overflow-auto">
//                                 <table className="w-full caption-bottom text-sm">
//                                     <thead>
//                                     <tr className="border-b bg-muted/50 transition-colors">
//                                         <th className="h-10 px-4 text-left font-medium">User</th>
//                                         <th className="h-10 px-4 text-left font-medium">Role</th>
//                                         <th className="h-10 px-4 text-left font-medium">Status</th>
//                                         <th className="h-10 px-4 text-left font-medium">Created</th>
//                                         <th className="h-10 px-4 text-left font-medium">Last Active</th>
//                                         <th className="h-10 px-4 text-right font-medium">Actions</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {paginatedUsers.map((user) => (
//                                         <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <Avatar>
//                                                         <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
//                                                         <AvatarFallback>{user.initials}</AvatarFallback>
//                                                     </Avatar>
//                                                     <div>
//                                                         <div className="font-medium">{user.name}</div>
//                                                         <div className="text-xs text-muted-foreground">{user.email}</div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4">
//                                                 <RoleBadge role={user.role} />
//                                             </td>
//                                             <td className="p-4">
//                                                 <StatusBadge status={user.status} />
//                                             </td>
//                                             <td className="p-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
//                                             <td className="p-4 text-muted-foreground">{new Date(user.lastActive).toLocaleDateString()}</td>
//                                             <td className="p-4 text-right">
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="sm">
//                                                             <MoreHorizontal className="h-4 w-4" />
//                                                             <span className="sr-only">Actions</span>
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem onClick={() => handleEditUser(user)}>
//                                                             <Edit className="mr-2 h-4 w-4" />
//                                                             Edit
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <Mail className="mr-2 h-4 w-4" />
//                                                             Email
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <Shield className="mr-2 h-4 w-4" />
//                                                             Change Role
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuSeparator />
//                                                         <DropdownMenuItem className="text-red-600">
//                                                             <Trash2 className="mr-2 h-4 w-4" />
//                                                             Delete
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//
//                         <div className="flex items-center justify-between">
//                             <div className="text-sm text-muted-foreground">
//                                 Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
//                                 <strong>{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</strong> of{" "}
//                                 <strong>{filteredUsers.length}</strong> users
//                             </div>
//                             <Pagination>
//                                 <PaginationContent>
//                                     <PaginationItem>
//                                         <PaginationPrevious
//                                             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                                             disabled={currentPage === 1}
//                                         />
//                                     </PaginationItem>
//                                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                                         let pageNumber: number
//
//                                         if (totalPages <= 5) {
//                                             pageNumber = i + 1
//                                         } else if (currentPage <= 3) {
//                                             pageNumber = i + 1
//                                         } else if (currentPage >= totalPages - 2) {
//                                             pageNumber = totalPages - 4 + i
//                                         } else {
//                                             pageNumber = currentPage - 2 + i
//                                         }
//
//                                         return (
//                                             <PaginationItem key={pageNumber}>
//                                                 <PaginationLink
//                                                     isActive={pageNumber === currentPage}
//                                                     onClick={() => setCurrentPage(pageNumber)}
//                                                 >
//                                                     {pageNumber}
//                                                 </PaginationLink>
//                                             </PaginationItem>
//                                         )
//                                     })}
//                                     {totalPages > 5 && currentPage < totalPages - 2 && (
//                                         <PaginationItem>
//                                             <PaginationEllipsis />
//                                         </PaginationItem>
//                                     )}
//                                     {totalPages > 5 && currentPage < totalPages - 2 && (
//                                         <PaginationItem>
//                                             <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
//                                         </PaginationItem>
//                                     )}
//                                     <PaginationItem>
//                                         <PaginationNext
//                                             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                                             disabled={currentPage === totalPages}
//                                         />
//                                     </PaginationItem>
//                                 </PaginationContent>
//                             </Pagination>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//
//             <UserDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} mode="create" />
//
//             {selectedUser && (
//                 <UserDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} mode="edit" user={selectedUser} />
//             )}
//         </div>
//     )
// }
//
// function RoleBadge({ role }: { role: string }) {
//     const variants = {
//         admin: { variant: "default" as const, label: "Admin" },
//         moderator: { variant: "secondary" as const, label: "Moderator" },
//         user: { variant: "outline" as const, label: "User" },
//     }
//
//     const { variant, label } = variants[role as keyof typeof variants] || variants.user
//
//     return <Badge variant={variant}>{label}</Badge>
// }
//
// function StatusBadge({ status }: { status: string }) {
//     const variants = {
//         active: { variant: "default" as const, className: "bg-green-500 hover:bg-green-600", label: "Active" },
//         inactive: { variant: "secondary" as const, label: "Inactive" },
//         suspended: { variant: "destructive" as const, label: "Suspended" },
//     }
//
//     const { variant, className, label } = variants[status as keyof typeof variants] || variants.inactive
//
//     return (
//         <Badge variant={variant} className={className}>
//             {label}
//         </Badge>
//     )
// }
