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

export function UserDialog({ open, onOpenChange, mode, user, onSuccess }) {
    const [activeTab, setActiveTab] = useState("details")
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        email: user?.email || "",
        password: "",
        status: user?.status || "active",
        role: user?.role || "user"
    })

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            // API endpoint and method based on mode
            const endpoint = mode === "create" 
                ? "http://localhost:5000/api/admin/users" 
                : `http://localhost:5000/api/admin/users/${user._id}`
            
            const method = mode === "create" ? "POST" : "PUT"
            
            // Prepare the request body
            const userData = {
                username: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                role: formData.role,
                status: formData.status
            }
            
            // Add password only for create mode
            if (mode === "create" && formData.password) {
                userData.password = formData.password
            }
            
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            })
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `Failed to ${mode} user`)
            }
            
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess()
            }
            
            // Close the dialog
            onOpenChange(false)
        } catch (err) {
            console.error(`Error ${mode === "create" ? "creating" : "updating"} user:`, err)
            alert(`Error: ${err.message}`)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Create New User" : "Edit User"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create" ? "Add a new user to the platform." : `Update details for ${user?.username || "user"}.`}
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
                                    <Input 
                                        id="firstName" 
                                        value={formData.firstName}
                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input 
                                        id="lastName" 
                                        value={formData.lastName}
                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required 
                                />
                            </div>

                            {mode === "create" && (
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        required={mode === "create"} 
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                    value={formData.status} 
                                    onValueChange={(value) => handleChange("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={5}>
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
                                <Select 
                                    value={formData.role} 
                                    onValueChange={(value) => handleChange("role", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={5}>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Label>Permissions</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="manage-users" defaultChecked={formData.role === "admin"} />
                                        <Label htmlFor="manage-users">Manage Users</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="manage-content"
                                            defaultChecked={formData.role === "admin"}
                                        />
                                        <Label htmlFor="manage-content">Manage Content</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="view-reports" defaultChecked={formData.role === "admin"} />
                                        <Label htmlFor="view-reports">View Reports</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="manage-settings" defaultChecked={formData.role === "admin"} />
                                        <Label htmlFor="manage-settings">Manage Settings</Label>
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
                                    <SelectContent position="popper" sideOffset={5}>
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
