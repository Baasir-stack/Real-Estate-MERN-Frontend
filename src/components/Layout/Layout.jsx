import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../utils/apiCall";
import userDetailsContext from "../../context/userDetailsContext";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";


const Layout = () => {
  useFavourites() 
  useBookings()
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails,userDetails } = useContext(userDetailsContext);
  
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email),
  });
  
  
  

  useEffect(() => {
    const getTokenAndRegsiter = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));

      
      mutate()
    };



    isAuthenticated && getTokenAndRegsiter() 
  }, [isAuthenticated]);
  
 
  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <hr style={{ color: "#eee", height: "5px" }} />
      <Footer />
    </>
  );
};

export default Layout;
