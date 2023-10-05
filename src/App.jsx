import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import userDetailsContext from "./context/userDetailsContext";
import { useState } from "react";
import Bookings from './pages/Bookings/Bookings'
import Favourites from './pages/Favourites/Favourties'

function App() {
  const queryClient = new QueryClient();

  const [userDetails,setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  })

  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" >
                <Route index element={<Properties/>}/>
                <Route path=":propertyId" element={<Property/>}/>
              </Route>
              <Route path="/bookings" element={<Bookings/>}/>
              <Route path="/favourites" element={<Favourites/>}/>

            </Route>
          </Routes>
        </Router>
      </div>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </userDetailsContext.Provider>
  );
}

export default App;
