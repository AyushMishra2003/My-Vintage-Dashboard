import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const carrerApi = createApi({
    reducerPath: "carrerApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["carrer"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllCarrer: builder.query({
            query: () => ({
                url: "/carrer",
                method: "GET",
            }),
            providesTags: ["carrer"],  // ✅ Caching Enable
        }),
        

      
        // ✅ DELETE Banner (DELETE)
        deleteCarrer: builder.mutation({
            query: (id) => ({
                url: `/carrer/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["carrer"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllCarrerQuery,
    useDeleteCarrerMutation,
} = carrerApi;
