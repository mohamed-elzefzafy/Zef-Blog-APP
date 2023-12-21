import { createSlice } from "@reduxjs/toolkit";


const commentSlice = createSlice({
  name : "comment",
  initialState : {
    comments : [],
    loadingComment : false
    // isCategoryCreated : false
  },
  reducers : {
setAllComents (state , action)  {
state.comments = action.payload.data;
},
deleteSpecificComent (state , action)  {
state.comments = state.comments.filter(comment => comment._id !== action.payload);
},
setLoading (state) {
  state.loadingComment = true;
},
clearLoading (state) {
  state.loadingComment = false;
},
  }
})


const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export {commentReducer , commentActions};