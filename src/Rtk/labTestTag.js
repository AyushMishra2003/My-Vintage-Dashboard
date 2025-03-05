import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const labTestApi = createApi({
    reducerPath: "labTestApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["lab"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllLabTestTag: builder.query({
            query: () => ({
                url: "/pathology/tag",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),

        getAllLabTest: builder.query({
            query: () => ({
                url: "/pathology",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Banner (POST)
        addBanner: builder.mutation({
            query: (formData) => {
                console.log("RTK Query Received FormData:", formData);
                return {
                    url: "/banner",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["banner"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/banner/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["banner"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["banner"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllLabTestTagQuery,
    useGetAllLabTestQuery,
    useAddBannerMutation,
    useEditBannerMutation,
    useDeleteBannerMutation,
} = labTestApi;
