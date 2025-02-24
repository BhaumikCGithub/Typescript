"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllRoles } from "@/services/RoleService";
import { getAllPermission } from "@/services/PermissionService";

export type Permission = {
    id: string;
    name: string;
};

export type Role = {
    id: string;
    name: string;
};

function RolePermissionForm() {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [roleData, setRoleData] = useState<Role[] | null>([]);
    const [permissionData, setPermissionData] = useState<Permission[] | null>([]);
    const [error, setError] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roles, permissions] = await Promise.all([
                    getAllRoles(),
                    getAllPermission()
                ]);

                if (!roles || roles.status !== 200) {
                    setError("Failed to fetch roles.");
                } else if (!permissions || permissions.status !== 200) {
                    setError("Failed to fetch permissions.");
                } else {
                    setRoleData(roles.data);
                    setPermissionData(permissions.data);
                }
            } catch (error: any) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const filteredPermissions = permissionData?.filter(permission =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = (data: any) => {
        console.log("Submitted Data:", data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Role Permission</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Role Permission</DialogTitle>
                    <DialogDescription>
                        Select Role and Permission here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Select Role</Label>
                        {roleData && roleData.length > 0 ? (
                            <Select onValueChange={(value) => setValue("role", value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roleData.map(role => (
                                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className="col-span-3 text-red-500">No roles available</p>
                        )}
                        {errors.role && <p className="text-red-500">Role is required</p>}
                    </div>
                
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-muted-foreground">Permissions</p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[150px] justify-start">
                                    {selectedPermission ? selectedPermission.name : "+ Set permission"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="right" align="start">
                                {permissionData && permissionData.length > 0 ? (
                                    <Command>
                                        <CommandInput
                                            placeholder="Search permissions..."
                                            value={searchTerm}
                                            onValueChange={setSearchTerm}
                                        />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup>
                                                {filteredPermissions?.map((permission) => (
                                                    <CommandItem
                                                        key={permission.id}
                                                        value={permission.id}
                                                        onSelect={() => {
                                                            setSelectedPermission(permission);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {permission.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                ) : (
                                    <p className="text-red-500 p-4">No permissions available</p>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RolePermissionForm;
