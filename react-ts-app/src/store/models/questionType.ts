import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { questionTypeApi } from '../../services'
import { questionTypeRes } from '../../services/type'
export const getQuestionType = createAsyncThunk('questionType',async ()=>{
  const res = await questionTypeApi()
  return res.data
})
interface initialStateType {
  questionType:questionTypeRes[]
}
const initialState:initialStateType = {
  questionType:[]
}
const questionTypeSlice = createSlice({
  name:'questionType',
  initialState,
  reducers:{},
  extraReducers:builder => {
    builder
      .addCase(getQuestionType.fulfilled, (state, action) => {
        state.questionType = action.payload.data.list
      })
  }
})
export const {  } = questionTypeSlice.actions
export default questionTypeSlice.reducer