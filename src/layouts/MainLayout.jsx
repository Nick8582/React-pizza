import Header from "../component/Header";
import {Outlet} from "react-router-dom";

function MainLayout() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;