import React, { useState } from "react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showPromotionSubMenu, setShowPromotionSubMenu] = useState(false);

  const handlePromotionClick = () => {
    setShowPromotionSubMenu(!showPromotionSubMenu);
  };

  return (
    <Menu style={{ backgroundColor: "#fff", width: "250px", minWidth: "250px", height: "100vh", position: "fixed" }}>
      <MenuItem onClick={handlePromotionClick}>
        <div style={{ padding: "10px 20px" }}>
          <div>Promotion</div>
        </div>
      </MenuItem>
      {showPromotionSubMenu && (
        <SubMenu title="Promotion" defaultOpen={true}>
          <MenuItem>
            <Link to="/admin/promotion/promocode">
              <div style={{ padding: "5px 20px" }}>
                <div>Promocode</div>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin/promotion/promocode-list">
              <div style={{ padding: "5px 20px" }}>
                <div>Promocode List</div>
              </div>
            </Link>
          </MenuItem>
        </SubMenu>
      )}
      <MenuItem>
        <Link to="/order">
          <div style={{ padding: "10px 20px" }}>
            <div>Orders</div>
          </div>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/admin/product">
          <div style={{ padding: "10px 20px" }}>
            <div>Products</div>
          </div>
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default Sidebar;
