import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getInfoApi } from '../../services'
export const getInfo = createAsyncThunk('info/getInfo',async ()=>{
  const res = await getInfoApi()
  return res.data
})

const infoSlice = createSlice({
  name:'info',
  initialState:{
    info:{}
  },
  reducers:{},
  extraReducers:builder => {
    builder
      .addCase(getInfo.fulfilled, (state, action) => {
        state.info = action.payload.data
      })
      .addCase(getInfo.rejected, (state, action) => {
        console.log('失败了....')
      })
  }
})
export const {  } = infoSlice.actions
export default infoSlice.reducer