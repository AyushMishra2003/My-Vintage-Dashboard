import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const orderApi = createApi({
    reducerPath: "orderApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["order"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllOrder: builder.query({
            query: () => ({
                url: "/order",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getAllTotalOrder: builder.query({
            query: () => ({
                url: "/order/summary",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),
        
        getAllLatest: builder.query({
            query: () => ({
                url: "/order/latest",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getAllHomeCollection: builder.query({
            query: () => ({
                url: "/order/home-collection",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getHomeCollectionDetail: builder.query({
            query: (id) => ({
                url: `/order/home-collection/${id}`,
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

      
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllOrderQuery,
    useGetAllTotalOrderQuery,
    useGetAllLatestQuery,
    useGetAllHomeCollectionQuery
} = orderApi;
