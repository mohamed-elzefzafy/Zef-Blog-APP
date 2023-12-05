import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/forms/LoginPage";
import RegisterPage from "./pages/forms/RegisterPage";
import PostsPage from "./pages/posts/PostsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CreatePostPage from "./pages/createPpst/CreatePostPage";

function App() {
  return (
<BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/posts" element={<PostsPage/>}/>
    <Route path="/posts/create-post" element={<CreatePostPage/>}/>
    <Route path="/admin-dashboard" element={<AdminDashboardPage/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/" element={<HomePage/>}/>
  </Routes>
</BrowserRouter>
  );
}

export default App;
