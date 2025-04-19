"use client";

import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, Users, Lock } from "lucide-react";
import { Button } from "components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card/card";
import { Input } from "components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/Select";
import { Badge } from "components/ui/Badge";
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

// Mock data for rooms
const mockRooms = Array.from({ length: 50 }, (_, i) => ({
    id: `room-${i + 1}`,
    name: `Study Room ${i + 1}`,
    description: `A study room for collaborative learning and focused work sessions. Room ${i + 1}.`,
    category:
        i % 5 === 0 ? "math" : i % 5 === 1 ? "science" : i % 5 === 2 ? "language" : i % 5 === 3 ? "history" : "general",
    creator: `User ${Math.floor(Math.random() * 20) + 1}`,
    memberCount: Math.floor(Math.random() * 30) + 1,
    maxMembers: 50,
    isPrivate: i % 3 === 0,
    isActive: i % 7 !== 0,
    activeTime: `${Math.floor(Math.random() * 8) + 1} hours`,
    isJoined: i % 4 === 0,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
}));

export function RoomManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [privacyFilter, setPrivacyFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState(mockRooms);

    const itemsPerPage = 10;

    // Filter rooms based on search query and filters
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.creator.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryFilter === "all" || room.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? room.isActive : !room.isActive);
        const matchesPrivacy = privacyFilter === "all" || (privacyFilter === "private" ? room.isPrivate : !room.isPrivate);

        return matchesSearch && matchesCategory && matchesStatus && matchesPrivacy;
    });

    // Paginate rooms
    const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Room
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Study Rooms</CardTitle>
                    <CardDescription>Manage study rooms across the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input
                                    placeholder="Search rooms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9"
                                />
                                <Button variant="outline" size="sm" className="h-9 px-3">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger className="h-9 w-[130px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            <SelectItem value="math">Math</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="language">Language</SelectItem>
                                            <SelectItem value="history">History</SelectItem>
                                            <SelectItem value="general">General</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="h-9 w-[130px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={privacyFilter} onValueChange={setPrivacyFilter}>
                                    <SelectTrigger className="h-9 w-[130px]">
                                        <SelectValue placeholder="Privacy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Privacy</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="public">Public</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                    <tr className="border-b bg-muted/50 transition-colors">
                                        <th className="h-10 px-4 text-left font-medium">Room</th>
                                        <th className="h-10 px-4 text-left font-medium">Category</th>
                                        <th className="h-10 px-4 text-left font-medium">Creator</th>
                                        <th className="h-10 px-4 text-left font-medium">Members</th>
                                        <th className="h-10 px-4 text-left font-medium">Status</th>
                                        <th className="h-10 px-4 text-left font-medium">Privacy</th>
                                        <th className="h-10 px-4 text-right font-medium">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedRooms.map((room) => (
                                        <tr key={room.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-medium">{room.name}</div>
                                                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                        {room.description}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline">
                                                    {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{room.creator}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span>{room.memberCount}</span>
                                                    <span className="text-muted-foreground">/ {room.maxMembers}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge status={room.isActive ? "active" : "inactive"} />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    {room.isPrivate ? (
                                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span>{room.isPrivate ? "Private" : "Public"}</span>
                                                </div>
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
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Room
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Users className="mr-2 h-4 w-4" />
                                                            Manage Members
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Room
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                                <strong>{Math.min(currentPage * itemsPerPage, filteredRooms.length)}</strong> of{" "}
                                <strong>{filteredRooms.length}</strong> rooms
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
                                            <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatusBadge({ status }) {
    const variants = {
        active: {
            variant: "outline",
            className: "border-green-500 text-green-500 bg-green-50 dark:bg-green-950/20",
            label: "Active",
        },
        inactive: {
            variant: "outline",
            className: "border-gray-500 text-gray-500",
            label: "Inactive",
        },
    };

    const { variant, className, label } = variants[status] || variants.inactive;

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
}