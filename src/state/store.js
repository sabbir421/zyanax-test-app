// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { productReducer } from "./product";
import { cartReducer } from "./cart";
import { userReducer } from "./user";
import { adminReducer } from "./admin";
import { orderReducer } from "./order";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  productList: productReducer,
  cartList: cartReducer,
  user: userReducer,
  admin: adminReducer,
  orders: orderReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
