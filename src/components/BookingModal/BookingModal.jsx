import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import userDetailsContext from "../../context/userDetailsContext";
import { bookVisit } from "../../utils/apiCall";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails,
    setUserDetails,
  } = useContext(userDetailsContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", { position: "bottom-right" });

    if (Array.isArray(userDetails?.bookings)) {
      setUserDetails((prev) => ({
        ...prev,
        bookings: [
          ...userDetails?.bookings,
          {
            id: propertyId,
            date: dayjs(value).format("DD/MM/YYYY"),
          },
        ],
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        bookings: [
          {
            id: propertyId,
            date: dayjs(value).format("DD/MM/YYYY"),
          },
        ],
      }));
    }
    console.log(dayjs(value).format("DD/MM/YYYY"));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(dayjs(value).format("DD/MM/YYYY"), propertyId, email),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(`${response.data.error}`),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select Your Date of Visit"
      centered
    >
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};


export default BookingModal;
