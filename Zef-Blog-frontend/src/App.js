import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/forms/LoginPage";
import RegisterPage from "./pages/forms/RegisterPage";
import PostsPage from "./pages/posts/PostsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import Footer from "./components/footer/Footer";
import PostDetailsPage from "./pages/postDetails/PostDetailsPage";
import { ToastContainer } from "react-toastify";
import CategoryPage from './images/category/CategoryPage';
import CreatePostPage from './pages/createPost/CreatePostPage';
import ProfilePage from "./pages/profile/ProfilePage";
import UsersTablePage from './pages/admin/UsersTablePage';


function App() {
  return (
<BrowserRouter>
<ToastContainer theme={"colored"} position={"top-center"}/>
  <Header/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/profile/:id" element={<ProfilePage/>}/>

    <Route path="posts">
    <Route index element={<PostsPage/>}/>
    <Route path="details/:id" element={<PostDetailsPage/>}/> 
    <Route path="categories/:category" element={<CategoryPage/>}/>
    <Route path="create-post" element={<CreatePostPage/>}/>
    </Route>

    <Route path="/admin-dashboard" element={<AdminDashboardPage/>}/>
    <Route path="/admin-dashboard/users-table" element={<UsersTablePage/>}/>
  </Routes>
  <Footer/>
</BrowserRouter>
  );
}

export default App;
