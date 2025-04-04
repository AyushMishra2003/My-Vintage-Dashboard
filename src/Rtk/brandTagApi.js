import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { data } from "autoprefixer";

export const BrandApi = createApi({
    reducerPath: "brandApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["brand"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllBrandName: builder.query({
            query: () => ({
                url: "/brand",
                method: "GET",
            }),
            providesTags: ["brand"],  // ✅ Caching Enable
        }),


        addBrand: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: "/brand",
                    method: "POST",
                    data, 

                };
            },
            invalidatesTags: ["brand"],
        }),


        editBrand: builder.mutation({
            query: ({data,id}) => {
                return {
                    url: `/brand/${id}`,
                    method: "PUT",
                    data, 

                };
            },
            invalidatesTags: ["brand"],
        }),
        

      
        // ✅ DELETE Banner (DELETE)
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/brand/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["brand"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
   useGetAllBrandNameQuery,
   useDeleteBrandMutation,
    useAddBrandMutation,
    useEditBrandMutation
} = BrandApi;
