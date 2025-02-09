import { FetchData, FetchDataResponse } from "./FetchData";

export type LoginResponse = {
    flag: boolean;
    token: string;
    data: any;
    message: string;
};


export async function login(
    data: any
): Promise<FetchDataResponse<LoginResponse>> {
    
    const response = await FetchData<LoginResponse>({
        url: "login",
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
        data: response.data.data,
        message: response.message
    };
}
