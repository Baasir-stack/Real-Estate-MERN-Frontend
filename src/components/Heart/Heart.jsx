import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import userDetailsContext from "../../context/userDetailsContext";
import { checkFavourites, updateFavourites } from "../../utils/common";
import useValidateAuth from "../../hooks/useValidateAuth";
import { useMutation } from "react-query";
import { addToFav } from "../../utils/apiCall";
import { toast } from "react-toastify";
import classNames from "classnames";

const Heart = ({ id }) => {
  const [color, setColor] = useState("white");
  const [isClicked, setIsClicked] = useState(false);

  const { user } = useAuth0();
  const {validateLogin} =useValidateAuth()

  const {
    userDetails,
    setUserDetails,
  } = useContext(userDetailsContext);

  useEffect(()=> {
    setColor(()=> (checkFavourites(id,userDetails?.favourites)))
},[userDetails?.favourites])

  const {mutate} = useMutation({
    mutationFn:()=>addToFav(id,user?.email),
    onSuccess:()=>{

        setUserDetails((prev)=>({
            ...prev,
            favourites:updateFavourites(id,prev.favourites)
        }))
        color === "white" ? 
        toast.success("Residency added to favourites",{position:"bottom-right",delay:0})
         :( toast.success("Residency removed from favourites",{position:"bottom-right",delay:0})
         )
        
    },
    onError:({response})=>{
        toast.error(response.data.error)
    }
  })  

  const handleLike = () => {
    if (validateLogin) {
        // setIsClicked((prev) => !prev);
        setColor((prev) => (prev === "fa3e5f" ? "white" : "fa3e5f"));
        mutate()
    }
  
  };


  return (
    <>
    <AiFillHeart
      size={40}
      color={color}
      className="like"
    //   className={classNames("like", { "hovered": isClicked })}
      onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
        />
    </>
    
  );
};

export default Heart;
