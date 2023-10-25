import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="postion-relative dashboard ">
      <TopBar />
      <main
        className="d-flex  gap-1"
        style={{ marginTop: "70px", height: "100vh" }}
      >
        <SideBar />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
