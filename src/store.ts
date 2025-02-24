import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatSlice from "./store/chatSlice";
import userSlice from "./store/userSlice";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 1) Combine your slices into a rootReducer
const rootReducer = combineReducers({
  chatreducer: chatSlice,
  userreducer: userSlice,
});

// 2) Define the RootState type based on your rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// 3) Create a persist config (with correct type for root state)
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

// 4) Create the persisted reducer
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// 5) Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 6) Create the persistor
export const persistor = persistStore(store);

// 7) Export the types for convenience
//    (RootState now matches the store’s state shape)
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
