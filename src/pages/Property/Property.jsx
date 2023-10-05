import { useLocation } from "react-router-dom";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { getProperty } from "../../utils/apiCall";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { PuffLoader } from "react-spinners";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import {  FaShower } from "react-icons/fa";
import Map from '../../components/Map/Map'
import { useAuth0 } from "@auth0/auth0-react";
import useValidateAuth from "../../hooks/useValidateAuth";
import { useContext, useState } from "react";
import BookingModal from "../../components/BookingModal/BookingModal";
import userDetailsContext from "../../context/userDetailsContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { removeBooking } from "../../utils/apiCall";
import Heart from "../../components/Heart/Heart";


const Property = () => {
  
  const { pathname } = useLocation();
    const id = pathname.split("/")[2];
  
    const { data, isLoading, isError } = useQuery(["resd", id], () =>
      getProperty(id)
    );

    const {
      userDetails:{bookings},
      setUserDetails
    } = useContext(userDetailsContext);

  const {  user } = useAuth0();
  const {validateLogin} =useValidateAuth()

  const [modalOpened, setModalOpened] = useState(false)



  const {mutate:cancelBooking, isLoading:cancelling} =useMutation({
    mutationFn:()=>removeBooking(id,user?.email),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },

  })


  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <section className="wrapper  property-wrapper">
      <div className="flexColCenter paddings innderWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id} />

        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
            {
             Array.isArray(bookings) && bookings?.map((booking) => booking.id).includes(id)  ? 
             ( <>
                <Button
                variant="outline"
                w={"100%"}
                color="red" 
                onClick={()=>cancelBooking()}
                disabled={cancelling}
                
                  >
                    Cancel Booking
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>)
              :
              (
                <button 
          className="button" 
          onClick={
            ()=>validateLogin() && setModalOpened(true)
          }
            >
            Book Your Visit
          </button>

              )
            }
          
          <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />

          </div>

          




          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;
