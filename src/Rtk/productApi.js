import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const productApi = createApi({
    reducerPath: "productApi",   
    baseQuery: axiosBaseQuery, 
    tagTypes: ["product"],  
    endpoints: (builder) => ({
       
        // ✅ ADD New Banner (POST)
        addProduct: builder.mutation({
            query: (formData) => {
                return {
                    url: "/product",
                    method: "POST",
                    data: formData,
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["product"],
        }),
        
        
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
   useAddProductMutation

} = productApi;
