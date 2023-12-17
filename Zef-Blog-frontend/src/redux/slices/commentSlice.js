import { createSlice } from "@reduxjs/toolkit";


const commentSlice = createSlice({
  name : "comment",
  initialState : {
    comments : []
  },
  reducers : {

  }
})


const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export {commentReducer , commentActions};