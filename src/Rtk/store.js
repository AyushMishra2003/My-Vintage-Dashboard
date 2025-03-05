import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./testApi";
import { scanApi } from "./scanApi";
import { scanTestApi } from "./scanTestApi";
import { bannerApi } from "./bannerApi";
import { labTestApi } from "./labTestTag";
import { packageApi } from "./packageApi";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer, // ✅ API Reducer 
        [scanApi.reducerPath]: scanApi.reducer,
        [scanTestApi.reducerPath]: scanTestApi.reducer,
        [bannerApi.reducerPath]:bannerApi.reducer,
        [labTestApi.reducerPath]:labTestApi.reducer,
        [packageApi.reducerPath]:packageApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware, scanApi.middleware,scanTestApi.middleware, bannerApi.middleware, labTestApi.middleware,packageApi.middleware),
});
