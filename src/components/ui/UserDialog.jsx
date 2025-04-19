import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "components/ui/Dialog"
import { Button } from "components/ui/Button"
import { Input } from "components/ui/Input"
import { Label } from "components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs"
import { Checkbox } from "components/ui/Checkbox"

export function UserDialog({ open, onOpenChange, mode, user }) {
    const [activeTab, setActiveTab] = useState("details")

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Create New User" : "Edit User"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create" ? "Add a new user to the platform." : `Update details for ${user?.name || "user"}.`}
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">User Details</TabsTrigger>
                        <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                        <TabsTrigger value="settings">Account Settings</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit}>
                        <TabsContent value="details" className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || ""} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue={user?.name?.split(" ")[1] || ""} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user?.email || ""} required />
                            </div>

                            {mode === "create" && (
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" required={mode === "create"} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={user?.status || "active"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </TabsContent>

                        <TabsContent value="roles" className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Primary Role</Label>
                                <Select defaultValue={user?.role || "user"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Label>Permissions</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="manage-users" defaultChecked={user?.role === "admin"} />
                                        <Label htmlFor="manage-users">Manage Users</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="manage-content"
                                            defaultChecked={user?.role === "admin" || user?.role === "moderator"}
                                        />
                                        <Label htmlFor="manage-content">Manage Content</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="view-reports" defaultChecked={user?.role === "admin" || user?.role === "moderator"} />
                                        <Label htmlFor="view-reports">View Reports</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="manage-settings" defaultChecked={user?.role === "admin"} />
                                        <Label htmlFor="manage-settings">Manage Settings</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="create-rooms" defaultChecked={true} />
                                        <Label htmlFor="create-rooms">Create Rooms</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="delete-rooms" defaultChecked={user?.role === "admin" || user?.role === "moderator"} />
                                        <Label htmlFor="delete-rooms">Delete Rooms</Label>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <Select defaultValue="all">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select notification preference" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Notifications</SelectItem>
                                        <SelectItem value="important">Important Only</SelectItem>
                                        <SelectItem value="none">No Notifications</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Label>Account Options</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="two-factor" />
                                        <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="password-reset" />
                                        <Label htmlFor="password-reset">Force Password Reset on Next Login</Label>
                                    </div>
                                    {mode === "edit" && (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="delete-account" />
                                            <Label htmlFor="delete-account" className="text-red-500">
                                                Mark for Deletion
                                            </Label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">{mode === "create" ? "Create User" : "Save Changes"}</Button>
                        </DialogFooter>
                    </form>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
