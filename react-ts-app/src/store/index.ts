import { configureStore } from '@reduxjs/toolkit'
import info from './models/info'
import menuList from './models/menulist'

const store = configureStore({
  reducer: {
    info,
    menuList
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store