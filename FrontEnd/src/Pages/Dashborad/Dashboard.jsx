import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/Navigation/SideBar";
import TopBar from "../../Components/Dashboard/Navigation/TopBar";
import "../../CSS/pages/dashboard.css";

const Dashboard = () => {
  return (
    <div className="postion-relative dashboard ">
      <TopBar />
      <main
        className="d-flex  gap-1"
        style={{ marginTop: "70px", height: "100vh" }}
      >
        <SideBar />
        <div className="child">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
