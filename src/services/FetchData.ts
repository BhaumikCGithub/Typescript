type FetchDataVariable = {
    url: string;
    method?: string;
    data?: any;
    headers?: HeadersInit;
};

export type FetchDataResponse<T> = {
    status: number;
    message: string;
    data: T | null;
};

export async function FetchData<T>({
    url,
    method = "GET",
    data = null,
    headers = { "Content-Type": "application/json" },
}: FetchDataVariable): Promise<FetchDataResponse<T>> {  

    try {
        const response = await fetch(`http://localhost:5173/api/${url}`, {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) { 
            const errorData = await response.json();

            return {
                status: errorData.status,
                message: errorData.message,
                data: null,
            };
        }

        const userData = await response.json();
        return {
            status: 200,
            message: userData.message,
            data: userData.data,
        };
    } catch (error) {   
        return {
            status: 500,
            message: "Internal Server Error",
            data: null,
        };
    }
}