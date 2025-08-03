import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const packageApi = createApi({
    reducerPath: "packageApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["theme"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllPackage: builder.query({
            query: () => ({
                url: "/package",
                method: "GET",
            }),
            providesTags: ["theme"],  // ✅ Caching Enable
        }),


        getAllThemeTag: builder.query({
            query: () => ({
                url: "/theme?isAdmin=admin",
                method: "GET",
            }),
            providesTags: ["theme"],  // ✅ Caching Enable
        }),

        addThemeTag: builder.mutation({
            query: ({ formData, pathologyId: slug }) => {

                return {
                    url: `/theme`,
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["theme"],
        }),

        // ✅ DELETE Test (DELETE)
        deleteThemeTag: builder.mutation({
            query: (id) => ({
                url: `/theme/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["theme"], // ✅ Cache Refresh
        }),

        // ✅ ADD New Test (POST)
        addPackage: builder.mutation({
            query: (formData) => {

                return {
                    url: "/package/detail",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["theme"],
        }),

        // ✅ EDIT Test (PUT)
        editThemeTag: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/theme/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["theme"], // ✅ Cache Refresh
        }),

        updatePackage: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/package/detail/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["theme"], // ✅ Cache Refresh
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
                url: `/package/detail/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["theme"], // ✅ Cache Refresh
        }),

        updateStatus: builder.mutation({
            query: (id) => ({
                url: `/theme/status/update/${id}`,
                method: "POST",
            }),
            providesTags: ["lab"],  
        }),


    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllPackageQuery,
    useGetAllThemeTagQuery,
    useAddThemeTagMutation,
    useAddPackageMutation,
    useEditThemeTagMutation,
    useDeleteThemeTagMutation,
    useDeletePackageMutation,
    useUpdatePackageMutation,
    useUpdateStatusMutation
} = packageApi;
