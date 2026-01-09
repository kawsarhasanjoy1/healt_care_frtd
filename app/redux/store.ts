import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { authReducer } from './api/fetures/auth'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore
} from 'redux-persist'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath] : baseApi.reducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
 
})
export let persistor = persistStore(store)



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store