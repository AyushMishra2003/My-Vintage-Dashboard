import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const labTestApi = createApi({
    reducerPath: "labTestApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["lab"],  // ✅ Caching tag
    endpoints: (builder) => ({

        getAllLabTestTag: builder.query({
            query: () => ({
                url: "/productcategory",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),

        getAllLabTest: builder.query({
            query: () => ({
                url: "/productcategory",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),





        // ✅ ADD New Banner (POST)
        addLabTestTag: builder.mutation({
            query: (data) => {

                return {
                    url: `/productcategory`,
                    method: "POST",
                    data

                };
            },
            invalidatesTags: ["lab"],
        }),


        addLabTest: builder.mutation({
            query: ({ data }) => ({
                url: `/pathology`,
                method: "POST",
                data
            }),
            invalidatesTags: ["lab"],
        }),


        getAllSubCategory: builder.query({
            query: (category) => ({
                url: `/productcategory/subcategory/${category}`,
                method: "GET",

            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),


        addSubProductCategory: builder.mutation({
            query: ({ data, name }) => {

                return {
                    url: `/productcategory/subcategory/${name}`,
                    method: "POST",
                    data

                };
            },
            invalidatesTags: ["lab"],
        }),

        editLabTest: builder.mutation({
            query: ({ data, id }) =>
                   
                    (
            
                
                {
                url: `/productcategory/${id}`,
                method: "PUT",
                data
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),





        // ✅ EDIT Test (PUT)
        editLabTag: builder.mutation({
            query: ({ data, name }) => ({
                url: `/productcategory/sub/${name}`,
                method: "PUT",
                data
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteLabTag: builder.mutation({
            query: (id) => ({
                url: `/productcategory/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

        deleteLabTest: builder.mutation({
            query: ({data,name}) => ({
                url: `/productcategory/sub/${name}`,
                method: "DELETE",
                data
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllLabTestTagQuery,
    useGetAllLabTestQuery,
    useAddLabTestTagMutation,
    useAddLabTestMutation,
    useEditLabTagMutation,
    useEditLabTestMutation,
    useDeleteLabTagMutation,
    useDeleteLabTestMutation,
    useGetAllSubCategoryQuery,
    useAddSubProductCategoryMutation
} = labTestApi;
