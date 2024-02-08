import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <ProSidebar style={{ backgroundColor: "white", width: "100%", minWidth: "100%" }}>
      <Menu>
        <MenuItem>
          <Link to="/admin">
            <div className="menu">
              <div>Promotion</div>
            </div>
          </Link>
          <Menu>
            <MenuItem>
              <Link to="/admin/promotion/promocode">
                <div className="submenu">
                  <div>Promocode</div>
                </div>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin/promotion/promocode-list">
                <div className="submenu">
                  <div>Promocode List</div>
                </div>
              </Link>
            </MenuItem>
          </Menu>
        </MenuItem>
        <MenuItem>
          <Link to="/order">
            <div className="menu">
              <div>Orders</div>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/product">
            <div className="menu">
              <div>Products</div>
            </div>
          </Link>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
