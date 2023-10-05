import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import useProperties from "../../hooks/userProperties";
import { useMutation } from "react-query";

import { toast } from "react-toastify";
import { createResidency } from "../../utils/apiCall";

const Facilities = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  setOpened,
  setActive
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails?.bedrooms,
      parkings: propertyDetails?.parkings,
      bathrooms: propertyDetails?.bathrooms,
    },

    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
      value < 1 ? "Must have atleast one bathroom" : null,
    },
  });
  const {user} = useAuth0()
  const {refetch:refetchProperties} = useProperties()

  const {mutate, isLoading} = useMutation({
    mutationFn:()=>createResidency({
        ...propertyDetails,userEmail:user?.email, facilities:{bedrooms, parkings, bathrooms},
    }),
    onError:({response})=>toast.error(response.data.error,{position:"bottom-right"}),
    onSettled:()=>{
        setPropertyDetails({
            title:"",
            description:"",
            price:0,
            address:"",
            country:"",
            city:"",
            facilities:{
                bedrooms:0,
                parkings:0,
                bathrooms:0,
            },
            image:null,
            userEmail:user?.email,
          })
          setOpened(false)
          setActive(0)
          refetchProperties()
    }
  })

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ 
        ...prev,
         facilities:{bedrooms, parkings, bathrooms}
         }));
      mutate()
    }
  };
  return (
    <Box maw="30%" mx="auto" my="sm">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        {/* left side */}
        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <NumberInput
            w={"100%"}
            withAsterisk
            label="No of Bedrooms"
            min={0}

            {...form.getInputProps("bedrooms")}
          />

          <NumberInput
            w={"100%"}
            withAsterisk
            label="No of Parkings"
            min={0}

            {...form.getInputProps("parkings", { type: "input" })}
          />

          <NumberInput
            withAsterisk
            label="No of Bathrooms"
            min={0}
            {...form.getInputProps("bathrooms")}
          />
        </div>

      </div>

      <Group position="center" mt={"xl"}>
        <Button default="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>

      </Group>
    </form>
    </Box>
  );
};

export default Facilities;
