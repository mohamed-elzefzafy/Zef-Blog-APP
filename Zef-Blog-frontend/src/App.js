import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/forms/LoginPage";
import RegisterPage from "./pages/forms/RegisterPage";
import PostsPage from "./pages/posts/PostsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import Footer from "./components/footer/Footer";
import PostDetailsPage from "./pages/postDetails/PostDetailsPage";
import CategoryPage from './pages/category/CategoryPage';
import CreatePostPage from './pages/createPost/CreatePostPage';
import ProfilePage from "./pages/profile/ProfilePage";
import UsersTablePage from './pages/admin/UsersTablePage';
import PostsTablePage from "./pages/admin/PostsTablePage";
import CategoriesTablePage from "./pages/admin/CategoriesTablePage";
import CommentsTablePage from "./pages/admin/CommentsTablePage";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./components/not -found/NotFound";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";



function App() {
  const {user} = useSelector((stste) => stste.auth)
  return (
<BrowserRouter>
<ToastContainer theme={"colored"} position={"top-center"}/>
  <Header/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={user ?<Navigate to="/"/> : <LoginPage/>}/>
    <Route path="/register" element={user ?<Navigate to="/"/> : <RegisterPage/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/profile/:id" element={<ProfilePage/>}/>

    <Route path="posts">
    <Route index element={<PostsPage/>}/>
    <Route path="details/:id" element={<PostDetailsPage/>}/> 
    <Route path="categories/:categoryId" element={<CategoryPage/>}/>
    <Route path="create-post" element={user? <CreatePostPage/> : <Navigate to="/"/>}/>
    </Route>

  <Route path="admin-dashboard">
    <Route index element={user?.isAdmin ? <AdminDashboardPage/> : <Navigate to="/"/>}/>
    <Route path="users-table" element={user?.isAdmin ? <UsersTablePage/> : <Navigate to="/"/> }/>
    <Route path="posts-table" element={user?.isAdmin ? <PostsTablePage/> : <Navigate to="/"/> }/>
    <Route path="categories-table" element={user?.isAdmin ? <CategoriesTablePage/> : <Navigate to="/"/>  }/>
    <Route path="comments-table" element={user?.isAdmin ? <CommentsTablePage/> : <Navigate to="/"/> }/>
  </Route>
  <Route path="*" element={<NotFound/>}/>
  </Routes>
  <Footer/>
</BrowserRouter>
  );
}

export default App;
