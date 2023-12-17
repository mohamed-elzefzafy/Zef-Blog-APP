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
  