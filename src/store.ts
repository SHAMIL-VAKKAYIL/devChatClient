import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
    reducer: {}
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;