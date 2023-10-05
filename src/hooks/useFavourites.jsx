import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useRef, useState } from "react";
import userDetailsContext from "../context/userDetailsContext";
import { useQuery } from "react-query";
import { allFav } from "../utils/apiCall";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const queryRef = useRef();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setIsQueryEnabled(true);
    }
  }, [isAuthenticated, user]);

  const { data, isLoading, isError, refetch } = useQuery(
    {
      queryKey: "allFavourites",
      queryFn: () =>isAuthenticated&&  allFav(user?.email),
      onSuccess: (data) =>
        setUserDetails((prev) => ({ ...prev, favourites: data })),
      enabled:user !==undefined ,
      staleTime: 30000, 
    },
    
  );

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
