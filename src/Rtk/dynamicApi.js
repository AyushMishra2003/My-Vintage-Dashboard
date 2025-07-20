import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery"; // Custom baseQuery that supports FormData

export const dynamicPageApi = createApi({
    reducerPath: "dynamicPageApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["page", "section", "child"],
    endpoints: (builder) => ({
        // ✅ Get All Pages
        getAllPages: builder.query({
            query: () => ({
                url: "/dynamic/page",
                method: "GET",
            }),
            providesTags: ["page"],
        }),

        // ✅ Create Page
        createPage: builder.mutation({
            query: (data) => ({
                url: "/dynamic/page",
                method: "POST",
                data,
            }),
            invalidatesTags: ["page"],
        }),

        // ✅ Get All Sections of a Page
        getSectionsByPage: builder.query({
            query: (pageName) => ({
                url: `/dynamic/page/section/${pageName}`,
                method: "GET",
            }),
            providesTags: ["section"],
        }),

        // ✅ Create Section
        createSection: builder.mutation({
            query: (formData) => ({
                url: "/dynamic/page/section",
                method: "POST",
                data: formData,
                formData: true,
            }),
            invalidatesTags: ["section"],
        }),

        deletePage: builder.mutation({
            query: ({ id }) => ({
                url: `/dynamic/pages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pages"],
        }),

        // ✅ Update Section
        updateSection: builder.mutation({
            query: ({ sectionId, formData }) => ({
                url: `/dynamic/page/section/${sectionId}`,
                method: "PUT",
                data: formData,
                formData: true,
            }),
            invalidatesTags: ["section"],
        }),

        // ✅ Get Specific Section (by page and section title)
        getSpecificSection: builder.query({
            query: (body) => ({
                url: "/dynamic/section/single",
                method: "POST",
                data: body,
            }),
            providesTags: ["section"],
        }),

        // ✅ Add Child to Section
        addChildToSection: builder.mutation({
            query: ({ sectionId, formData }) => ({
                url: `/dynamic/section/child/${sectionId}`,
                method: "POST",
                data: formData,
                formData: true,
            }),
            invalidatesTags: ["child"],
        }),

        // ✅ Update Child
        updateChildInSection: builder.mutation({
            query: ({ sectionId, formData }) => ({
                url: `/dynamic/section/child/update/${sectionId}`,
                method: "PUT",
                data: formData,
                formData: true,
            }),
            invalidatesTags: ["child"],
        }),

        // ✅ Get Section Child by Title
        getChildByTitle: builder.query({
            query: ({ pageName, childTitle }) => ({
                url: `/dynamic/section/child/${pageName}/${childTitle}`,
                method: "GET",
            }),
            providesTags: ["child"],
        }),
    }),
});

export const {
    useGetAllPagesQuery,
    useCreatePageMutation,
    useDeletePageMutation,
    useGetSectionsByPageQuery,
    useCreateSectionMutation,
    useUpdateSectionMutation,
    useGetSpecificSectionQuery,
    useAddChildToSectionMutation,
    useUpdateChildInSectionMutation,
    useGetChildByTitleQuery,
} = dynamicPageApi;
