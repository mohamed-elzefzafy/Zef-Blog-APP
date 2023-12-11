import "./admin.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";


const AdminDashboardPage = () => {
  return (
    <section className="admin-dasboard">
      <AdminSidebar/>
      <AdminMain/>
    </section>
  )
}

export default AdminDashboardPage;