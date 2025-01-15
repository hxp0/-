import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getInfoApi } from '../../services'
import { infoDataType } from '../../services/type'
export const getInfo = createAsyncThunk('info/getInfo',async ()=>{
  const res = await getInfoApi()
  return res.data
})
interface initialStateType {
  info:infoDataType
}
const initialState:initialStateType = {
  info:{} as infoDataType
}
const infoSlice = createSlice({
  name:'info',
  initialState,
  reducers:{},
  extraReducers:builder => {
    builder
      .addCase(getInfo.fulfilled, (state, action) => {
        state.info = action.payload.data!
        localStorage.setItem('permission', JSON.stringify(state.info.permission))
      })
  }
})
export const {  } = infoSlice.actions
export default infoSlice.reducer