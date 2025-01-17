import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { menulistApi } from '../../services'
import { menulistDataType } from '../../services/type'
export const getMenuList = createAsyncThunk('menuList',async ()=>{
  const res = await menulistApi()
  return res.data
})
interface initialStateType {
  menuList:menulistDataType[]
}
const initialState:initialStateType = {
  menuList:[]
}

const menuListSlice = createSlice({
  name:'menuList',
  initialState,
  reducers:{},
  extraReducers:builder => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.menuList = action.payload.data!.list
      })
  }
})
export const {  } = menuListSlice.actions
export default menuListSlice.reducer