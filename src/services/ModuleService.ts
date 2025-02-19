import { ModuleData } from "@/components/Form/ModuleForm";
import { FetchData, FetchDataResponse } from "./FetchData";

export type ModuleResponse = {
    actions: any;
    moduleName: any;
    success: boolean;
    data: any;
    message: string;
}

export async function CreateModule(data: ModuleData): Promise<FetchDataResponse<ModuleResponse[]>> { 
    const response = await FetchData<ModuleResponse[]>({
        url: "create-module",
        method: "POST",
        data: data,
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

export async function getModules():Promise<FetchDataResponse<ModuleResponse[]>>{
    const response = await FetchData<ModuleResponse[]>({
        url: "modules",
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
