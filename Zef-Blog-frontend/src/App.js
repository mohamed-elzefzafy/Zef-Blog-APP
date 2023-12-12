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
import PostsTablePage from "./pages/admin/PostsTablePage";
import CategoriesTablePage from "./pages/admin/CategoriesTablePage";
import CommentsTablePage from "./pages/admin/CommentsTablePage";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./components/not -found/NotFound";


function App() {
  return (
<BrowserRouter>
<ToastContainer theme={"colored"} position={"top-center"}/>
  <Header/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/profile/:id" element={<ProfilePage/>}/>

    <Route path="posts">
    <Route index element={<PostsPage/>}/>
    <Route path="details/:id" element={<PostDetailsPage/>}/> 
    <Route path="categories/:category" element={<CategoryPage/>}/>
    <Route path="create-post" element={<CreatePostPage/>}/>
    </Route>

  <Route path="admin-dashboard">
    <Route index element={<AdminDashboardPage/>}/>
    <Route path="users-table" element={<UsersTablePage/>}/>
    <Route path="posts-table" element={<PostsTablePage/>}/>
    <Route path="categories-table" element={<CategoriesTablePage/>}/>
    <Route path="comments-table" element={<CommentsTablePage/>}/>
  </Route>
  <Route path="*" element={<NotFound/>}/>
  </Routes>
  <Footer/>
</BrowserRouter>
  );
}

export default App;
