import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CategoryIcon from "@mui/icons-material/Category";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <ProSidebar
      style={{ backgroundColor: "white", width: "100%", minWidth: "100%" }}
    >
      <Menu
      // menuItemStyles={{
      //   button: {
      //     // the active class will be added automatically by react router
      //     // so we can use it to style the active menu item
      //     [`&.active`]: {
      //       backgroundColor: '#13395e',
      //       color: '#b6c8d9',
      //     },
      //   },
      // }}
      >
        <MenuItem component={<Link to="/admin" />}>
          <div className="menu">
            <div>Promotion</div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/order" />}>
          <div className="menu">
            <div>Orders</div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/admin/product" />}>
          <div className="menu">
            <div>Products</div>
          </div>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
