import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { menulistApi } from '../../services'
export const getMenuList = createAsyncThunk('menuList',async ()=>{
  const res = await menulistApi()
  return res.data
})


const menuListSlice = createSlice({
  name:'menuList',
  initialState:{
    menuList:[]
  },
  reducers:{},
  extraReducers:builder => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        state.menuList = action.payload.data.list
      })
      .addCase(getMenuList.rejected, (state, action) => {
        console.log('失败了....')
      })
  }
})
export const {  } = menuListSlice.actions
export default menuListSlice.reducer