import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["product"],
    endpoints: (builder) => ({

        getAllProduct: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/product?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["product"], // ✅ Keeps caching support
        }),

        getProductDetail: builder.query({
            query: (id) => ({
                url: `/product/detail/${id}`,
                method: "GET",
            }),
            providesTags: ["product"], // ✅ Keeps caching support
        }),

        // ✅ ADD New Product (POST)
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


        editProduct: builder.mutation({
            query: ({data,id}) => {
                return {
                    url: `/product/${id}`,
                    method: "PUT",
                    data,
                    formData: true, 
                };
            },
            invalidatesTags: ["product"],
        }),


         deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                    method: "delete",

                };
            },
            invalidatesTags: ["product"],
        }),


    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllProductQuery,
    useAddProductMutation,
    useGetProductDetailQuery,
    useEditProductMutation,
    useDeleteProductMutation

} = productApi;
