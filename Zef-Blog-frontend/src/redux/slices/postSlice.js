import { createSlice } from "@reduxjs/toolkit";



const postSlice = createSlice({
  name : "post" , 
  initialState : {
    posts : [] ,
    postCount : null,
    postsCat : [],
    loading : false,
    isPostCreated : false ,
    post : null
  } , 
  reducers : {
  setPosts (state , action) {
    state.posts = action.payload;
  },
  setPostsCount (state , action) {
    state.postCount = action.payload;
  },
  setPostCate (state , action) {
    state.postsCat = action.payload;
  },
  setLoading (state) {
    state.loading = true;
  },
  clearLoading (state) {
    state.loading = false;
  },
  setIsPostCreated (state) {
    state.isPostCreated = true;
    state.loading = false;
  },
  clearIsPostCreated (state) {
    state.isPostCreated = false;
  },
  setSpecificPost (state , action) {
    state.post = action.payload.data;
  },
  setlike (state , action) {
    state.post.likes = action.payload.likes;
  },
  deletePost (state , action) {
    state.posts = state.posts.filter((post) => post._id !== action.payload)
  },
  addComment (state , action) {
    state.post.comments.push(action.payload);
  },
  updateCommentPost (state , action) {
    state.post.comments = state.post.comments.map((comment) => 
    comment._id !== action.payload._id ? action.payload : comment
    )
  },
  deleteCommentPost (state , action) {
    const comment = state.post.comments.find((comment) => comment._id === action.payload);
    const commentIndex = state.post.comments.indexOf(comment);
    state.post.comments.splice(commentIndex , 1);
    
  },
  }
})


const postAction = postSlice.actions ;
const postReducer = postSlice.reducer ;


export {postAction , postReducer};