import { toast } from "sonner";  // ✅ Notifications के लिए
import axios from "axios";

// ✅ Axios Instance 
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Custom Axios Base Query for RTK Query
const axiosBaseQuery = async ({ url, method, data }) => {
    try {
        console.log("Request Data:", data); // ✅ Debugging

        const response = await axiosInstance({
            url,
            method,
            ...(data instanceof FormData 
                ? { data, headers: { "Content-Type": "multipart/form-data" } }  // ✅ Handles FormData properly
                : { data }
            ),
        });

        response?.data?.message && toast.success(response?.data?.message); // ✅ Success Toast
        return { data: response?.data?.data };
    } catch (error) {
        console.error("Request Error:", error);
        
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMessage); // ✅ Error Toast

        return {
            error: {
                status: error.response?.status || 500, // ✅ Default to 500 if undefined
                message: errorMessage,
            },
        };
    }
};


export default axiosBaseQuery;
