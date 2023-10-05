import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
// import "./ProfileMenu.css";

const ProifleMenu = ({ user, logout }) => {

  const navigate = useNavigate()
  return (
    <Menu width={110} shadow="md">
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={()=>navigate('./favourites',{replace:true})}>Favourites</Menu.Item>
        <Menu.Item  onClick={()=>navigate('./bookings',{replace:true})}>Bookings</Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProifleMenu;
