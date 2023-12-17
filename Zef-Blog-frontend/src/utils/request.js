import axios from "axios";

 const request = axios.create({
  baseURL : "http://localhost:8000"
  // baseURL : "https://zef-blog.onrender.com"
})


export default request