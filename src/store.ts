import { configureStore } from "@reduxjs/toolkit";
import messageSlice from './store/messageSlice'
import userSlice from './store/userSlice'

const store = configureStore({
    reducer: {
        chatreducer:messageSlice,
        userreducer:userSlice
    }
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;