import { useState, useEffect, useCallback } from "react";
import {
    Search,
    Filter,
    UserPlus,
    MoreHorizontal,
    Edit,
    Trash2,
    Shield,
    Mail,
    Download,
    AlertCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/Avatar";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card/card";
import { Input } from "components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/Select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/DropDownMenu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "components/ui/Pagination";
import { UserDialog } from "components/ui/UserDialog";

export function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const itemsPerPage = 10;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Handle role filter change
    const handleRoleFilterChange = (value) => {
        setRoleFilter(value);
        setCurrentPage(1); // Reset to first page when filter changes
    };
    
    // Handle status filter change
    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Utility function to build query parameters
    const buildQueryParams = useCallback((page = currentPage) => {
        let queryParams = `page=${page}&limit=${itemsPerPage}`;
        
        // Add role filter if not "all"
        if (roleFilter !== "all") {
            queryParams += `&role=${roleFilter}`;
        }
        
        // Add search query if not empty
        if (searchQuery.trim()) {
            queryParams += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }
        
        // Add status filter if not "all"
        if (statusFilter !== "all") {
            queryParams += `&status=${statusFilter}`;
        }
        
        return queryParams;
    }, [currentPage, itemsPerPage, roleFilter, searchQuery, statusFilter]);

    // Utility function to fetch users
    const fetchUsers = useCallback(async (page = currentPage) => {
        try {
            setLoading(true);
            
            const queryParams = buildQueryParams(page);
            const response = await fetch(`http://localhost:5000/api/admin/users?${queryParams}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('The server did not return JSON. This might indicate a server error or an authentication issue.');
            }

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }
            
            setUsers(data.users);
            setTotalPages(data.totalPages);
            setTotalUsers(data.totalUsers);
            setError(null);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message);
            
            // If there's an authentication error, provide more helpful message
            if (err.message.includes('authentication') || err.message.includes('token')) {
                setError('Authentication error. Please make sure you are logged in as an admin.');
            }
        } finally {
            setLoading(false);
        }
    }, [buildQueryParams, currentPage]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Function to handle user deletion
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }

            // Adjust page if necessary
            if (users.length === 1 && currentPage > 1) {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                fetchUsers(newPage);
            } else {
                fetchUsers();
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            alert(`Error: ${err.message}`);
        }
    };

    // Function to handle role change
    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user role');
            }

            // Refresh user list
            fetchUsers();
        } catch (err) {
            console.error('Error updating user role:', err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsEditDialogOpen(true);
    };

    // Function to get initials from username
    const getInitials = (username) => {
        if (!username) return 'U';
        return username.substring(0, 2).toUpperCase();
    };

    // Function to determine active status based on login history
    const getUserStatus = (user) => {
        if (!user.admin?.lastLogin) return 'inactive';
        
        const lastLogin = new Date(user.admin.lastLogin);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        return lastLogin > thirtyDaysAgo ? 'active' : 'inactive';
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    if (error && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p>Error: {error}</p>
                <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage user accounts, roles, and permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            // Search is already handled by the useEffect dependency
                                        }
                                    }}
                                    className="h-9"
                                />
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-9 px-3"
                                    onClick={() => {
                                        // Search is already handled by the useEffect dependency
                                        // This button is just for UI consistency
                                    }}
                                    type="button"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                                        <SelectTrigger className="h-9 w-[130px]">
                                            <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" sideOffset={5}>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                                        <SelectTrigger className="h-9 w-[130px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" sideOffset={5}>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                    <tr className="border-b bg-muted/50 transition-colors">
                                        <th className="h-10 px-4 text-left font-medium">User</th>
                                        <th className="h-10 px-4 text-left font-medium">Role</th>
                                        <th className="h-10 px-4 text-left font-medium">Status</th>
                                        <th className="h-10 px-4 text-left font-medium">Created</th>
                                        <th className="h-10 px-4 text-left font-medium">Last Active</th>
                                        <th className="h-10 px-4 text-right font-medium">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user) => {
                                        const avatarUrl = user.settings?.profile?.avatarUrl;
                                        const status = getUserStatus(user);
                                        return (
                                            <tr
                                                key={user._id}
                                                className="border-b transition-colors hover:bg-muted/50"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={avatarUrl || "/placeholder.svg"}
                                                                alt={user.username}
                                                            />
                                                            <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{user.username}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <RoleBadge role={user.role} />
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge status={status} />
                                                </td>
                                                <td className="p-4 text-muted-foreground">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-muted-foreground">
                                                    {user.admin?.lastLogin 
                                                        ? new Date(user.admin.lastLogin).toLocaleDateString()
                                                        : "Never"
                                                    }
                                                </td>
                                                <td className="p-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Actions</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Email
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem 
                                                                onClick={() => handleRoleChange(
                                                                    user._id, 
                                                                    user.role === 'admin' ? 'user' : 'admin'
                                                                )}
                                                            >
                                                                <Shield className="mr-2 h-4 w-4" />
                                                                {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem 
                                                                className="text-red-600"
                                                                onClick={() => handleDeleteUser(user._id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing <strong>{users.length ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{" "}
                                <strong>
                                    {Math.min(currentPage * itemsPerPage, totalUsers)}
                                </strong>{" "}
                                of <strong>{totalUsers}</strong> users
                            </div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNumber;

                                        if (totalPages <= 5) {
                                            pageNumber = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNumber = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNumber = totalPages - 4 + i;
                                        } else {
                                            pageNumber = currentPage - 2 + i;
                                        }

                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    isActive={pageNumber === currentPage}
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}
                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(totalPages)}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                                            }
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <UserDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                mode="create"
                onSuccess={() => {
                    // Refresh the user list after creating a new user
                    setCurrentPage(1); // Go back to first page to see the new user
                    fetchUsers(1);
                }}
            />

            {selectedUser && (
                <UserDialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    mode="edit"
                    user={selectedUser}
                    onSuccess={() => {
                        // Refresh the user list after editing
                        fetchUsers();
                    }}
                />
            )}
        </div>
    );
}

function RoleBadge({ role }) {
    const variants = {
        admin: { variant: "default", label: "Admin" },
        user: { variant: "outline", label: "User" },
    };

    const { variant, label } = variants[role] || variants.user;

    return <Badge variant={variant}>{label}</Badge>;
}

function StatusBadge({ status }) {
    const variants = {
        active: { variant: "default", className: "bg-green-500 hover:bg-green-600", label: "Active" },
        inactive: { variant: "secondary", label: "Inactive" },
        suspended: { variant: "destructive", label: "Suspended" },
    };

    const { variant, className, label } = variants[status] || variants.inactive;

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
}