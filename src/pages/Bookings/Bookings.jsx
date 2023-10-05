// Import Swiper styles
import "swiper/css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/userProperties";
import "../Properties/Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { useContext, useState } from "react";
import userDetailsContext from "../../context/userDetailsContext";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();

  const {userDetails:{bookings}} = useContext(userDetailsContext)

  const [filter, setFilter] = useState("");

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
    <section className="wrapper properties-wrapper">
      <div className="flexColCenter innerWidth paddings properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data
              .filter((property) =>
             Array.isArray(bookings) && bookings.map((booking) => booking.id).includes(property.id)
            )
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
