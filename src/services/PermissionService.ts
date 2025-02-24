import { Permission } from "@/components/Form/RolePermissionForm";
import { FetchData, FetchDataResponse } from "./FetchData";


export async function getAllPermission(): Promise<FetchDataResponse<Permission[]>> {
    const response = await FetchData<Permission[]>({
        url: "get-permissions",
        method: "GET",
    });

    if (!response.data) {
        return {
            status: 400,
            message: "Response is Empty.",
            data: null,
        };
    }

    return {
        status: response.status,
        data: response.data,
        message: response.message
    };
}