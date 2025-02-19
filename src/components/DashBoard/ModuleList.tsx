import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getModules } from "@/services/ModuleService";

// Define module type
type Module = {
    moduleId: string;
    moduleName: string;
    actions: number[];
};

const ModuleTable = () => {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await getModules();
                if (!response) {
                    setError("Failed to fetch modules.");
                }
                if (response.data) {
                    const modulesData: Module[] = response.data.map((module: any) => ({
                        moduleId: module.moduleId,
                        moduleName: module.moduleName,
                        actions: module.actions
                    }));
                    setModules(modulesData);
                    setLoading(false);
                }

            } catch (error: any) {
                setError(error.message);
            }   finally {
                setLoading(false);   
            }
        }
        fetchModules();
    }, [])


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Modules</h2>

            {/* Show Error if exists */}
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3 text-center">Module Name</TableHead>
                        <TableHead className="w-2/3 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {loading
                        ? // Show Skeletons while loading
                        Array.from({ length: 3 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-6 w-40" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-60" />
                                </TableCell>
                            </TableRow>
                        ))
                        : // Render actual data
                        modules.map((module) => (
                            <TableRow key={module.moduleId}>
                                <TableCell className="font-medium">{module.moduleName}</TableCell>
                                <TableCell>{module.actions.join(", ")}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ModuleTable;


