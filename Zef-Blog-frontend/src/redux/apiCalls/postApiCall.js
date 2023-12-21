import request from "../../utils/request"
import {postAction} from "../slices/postSlice";
import { toast } from "react-toastify";

// fetch post based on page number
export function getAllPosts (pageNumber) {
return  async (dispatch) => {
    try {
      dispatch(postAction.setLoading());
      const {data} = await request.get(`/api/v1/posts?pageNumber=${pageNumber}`);

      dispatch(postAction.setPosts(data));
      dispatch(postAction.clearLoading());
      toast.success(data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
}


export function getAllPostsWithoutPgeNumber () {
  return  async (dispatch) => {
      try {
        
        const {data} = await request.get(`/api/v1/posts`);
  
        dispatch(postAction.setPosts(data));
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
  
// count of posts
export function getPostsCount () {
return  async (dispatch) => {
    try {
      const {data} = await request.get(`/api/v1/posts/count`);

      dispatch(postAction.setPostsCount(data));
      toast.success(data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
}

// fetch post based on Category
export function getCategoryPosts (categoryId) {
  return  async (dispatch) => {
      try {
        const {data} = await request.get(`/api/v1/posts?category=${categoryId}`);
  
        dispatch(postAction.setPostCate(data));
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
// create post 
export function createPost (post) {
  return  async (dispatch , getState) => {
      try {
        dispatch(postAction.setLoading());
           await request.post(`/api/v1/posts` , post , {
          headers : {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        dispatch(postAction.setIsPostCreated());
        setTimeout(() => {
          dispatch(postAction.clearIsPostCreated())
        }, 2000);

      } catch (error) {
        dispatch(postAction.clearLoading());
        toast.error(error?.response?.data?.message);
      }
    }
  }


  // ge specific post 
export function getOnePost (id) {
  return  async (dispatch) => {
      try {
        const {data} = await request.get(`/api/v1/posts/${id}`);
  
        dispatch(postAction.setSpecificPost(data?.data));
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
  // toggle Like Post 
export function toggleLikePost (id) {
  return  async (dispatch , getState) => {
      try {
        const {data} = await request.put(`/api/v1/posts/like/${id}` , {} , {
          headers : {
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
  
        dispatch(postAction.setlike(data?.data));
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }


  // update Post Image 
export function updatePostImage (id , image) {
  return  async (dispatch , getState) => {
      try {
    await request.put(`/api/v1/posts/update-image/${id}` , image , {
          headers : {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        toast.success("successfully updated")
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }

  // update Post  
export function updatePost (id , postData) {
  return  async (dispatch , getState) => {
      try {
        const {data} = request.put(`/api/v1/posts/${id}` , postData , {
          headers : {
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        dispatch(postAction.setSpecificPost(data?.data));
        toast.success("successfully updated")
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }


  // deletete Post  
export function deletePost (id) {
  return  async (dispatch , getState) => {
      try {
        dispatch(postAction.clearLoading());
      const {data} = await request.delete(`/api/v1/posts/${id}` , {
          headers : {
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        dispatch(postAction.setLoading());
        dispatch(postAction.deletePost(data?.postId));


        setTimeout(() => {
          dispatch(postAction.clearLoading());
        }, 2000);
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }