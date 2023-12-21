import { toast } from "react-toastify";
import request from "../../utils/request";
import { categoryAction } from "../slices/categorySlice";



export function getCategories () {
  return  async (dispatch) => {
      try {
        const {data} = await request.get(`/api/v1/categories`);
  
        dispatch(categoryAction.setCategories(data));
        toast.success(data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
  

export function getOneCategory (id) {
  return  async (dispatch) => {
      try {
        const {data} = await request.get(`/api/v1/categories/${id}`);
  
        dispatch(categoryAction.setCategory(data));
        // toast.success(data?.message)
      } catch (error) {
        // toast.error(error?.response?.data?.message);
      }
    }
  }
  

  export function deleteCategory (id) {
    return  async (dispatch , getState) => {
        try {
          
        const {data} = await request.delete(`/api/v1/categories/${id}` , {
            headers : {
              Authorization : `Bearer ${getState().auth.user.token}`
            }
          });

          dispatch(categoryAction.deleteCategory(id));
          dispatch(categoryAction.setLoading());
          setTimeout(() => {
            dispatch(categoryAction.clearLoading());
          }, 2000);
        
          toast.success(data?.message)
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }
    }

  export function createCategory (category) {
    return  async (dispatch , getState) => {
        try {
        
        const {data} = await request.post(`/api/v1/categories` , category , {
            headers : {
              Authorization : `Bearer ${getState().auth.user.token}`
            }
          });
          dispatch(categoryAction.addCategory(data));
          dispatch(categoryAction.setLoading());
          setTimeout(() => {
            dispatch(categoryAction.clearLoading());
          }, 2000);
          toast.success("category created successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }
    }