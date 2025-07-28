import { configureStore } from '@reduxjs/toolkit'
import athletesReducer from './slices/athletesSlice'
import regionsReducer from './slices/regionsSlice'
import dashboardReducer from './slices/dashboardSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    athletes: athletesReducer,
    regions: regionsReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 