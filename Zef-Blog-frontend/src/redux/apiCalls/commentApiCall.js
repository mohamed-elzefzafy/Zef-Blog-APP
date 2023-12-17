import { toast } from "react-toastify";
import request from "../../utils/request";
import { commentActions } from "../slices/commentSlice";
import { postAction } from "../slices/postSlice";


// create post 
export function createComment (comment) {
  return  async (dispatch , getState) => {
      try {
        const {data} =  await request.post(`/api/v1/comments` , comment , {
          headers : {
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        dispatch(postAction.addComment(data));
      toast.success("comment created successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }


export function updateComment (id , comment) {
  return  async (dispatch , getState) => {
      try {
        const {data} =  await request.put(`/api/v1/comments/${id}` , comment , {
          headers : {
            Authorization : `Bearer ${getState().auth.user.token}`
          }
        });
        dispatch(postAction.updateCommentPost(data));
      toast.success("comment updated successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }


  export function deleteComment (id ) {
    return  async (dispatch , getState) => {
        try {
          const {data} =  await request.delete(`/api/v1/comments/${id}` , {
            headers : {
              Authorization : `Bearer ${getState().auth.user.token}`
            }
          });
          dispatch(postAction.deleteCommentPost(data));
        toast.success("comment updated successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }
    }
  
