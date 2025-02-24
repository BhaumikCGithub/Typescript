import { Role } from "@/components/Form/RolePermissionForm";
import { FetchData, FetchDataResponse } from "./FetchData";


export async function getAllRoles(): Promise<FetchDataResponse<Role[]>> {
    const response = await FetchData<Role[]>({
        url: "get-roles",
        method: "GET",
    });
    console.log(response);
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