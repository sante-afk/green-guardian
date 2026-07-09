import axios, { AxiosError } from "axios";

export const postMessage = async (message: string, sucAlert: any, erAlert: any, isLoading: any) => {
    try {
        const resp = await axios.post("http://localhost:5174/v1/chat/completions", {
            model: 'auto',
            messages: [
                { "role": "user", "content": message }
            ],
        }, {
            headers: {
                'Authorization': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json',
            }
        })
        sucAlert = true;
        isLoading.value = false;
        return resp.data;
    } catch (error: AxiosError | unknown) {
        erAlert = true;
        console.log(error);
        isLoading.value = false;
        return error;
    }
}
