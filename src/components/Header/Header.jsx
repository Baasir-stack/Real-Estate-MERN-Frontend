import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProifleMenu from "../ProfileMenu/ProifleMenu";
import useValidateAuth from "../../hooks/useValidateAuth";
import AddPropertyModal from "../AddProppertyModal/AddPropertyModal";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const {loginWithRedirect, isAuthenticated, user, logout}  = useAuth0()
  const {validateLogin}  = useValidateAuth()

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  const handleAddPropertyClick = ()=>{
    if(validateLogin){
      setModalOpened(true)
    }
  }


  return (
    <section className="h-wrapper ">
      <div className="flexCenter paddings innerWidth h-container">  
        <Link to='/'>
        <img src="/logo.png" alt="logo" width={150} />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
          <NavLink to="/properties">Properties</NavLink>
              <a href="">Contact</a>

              <div onClick={handleAddPropertyClick}>Add Property</div>
             <AddPropertyModal  opened={modalOpened} setOpened={setModalOpened}/>

             {!isAuthenticated? <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            : <ProifleMenu user={user} logout={logout}/>  
            }
            
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
