import { configureStore } from '@reduxjs/toolkit'
import info from './models/info'
import menuList from './models/menulist'
import questionType from './models/questionType'

const store = configureStore({
  reducer: {
    info,
    menuList,
    questionType
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store