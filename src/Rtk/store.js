import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./testApi";
import { scanApi } from "./scanApi";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer, // ✅ API Reducer 
        [scanApi.reducerPath]: scanApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware, scanApi.middleware),
});
