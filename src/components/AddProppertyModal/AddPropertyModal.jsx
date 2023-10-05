import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const {user} = useAuth0()

  const [propertyDetails, setPropertyDetails] = useState({
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

  const nextStep = ()=>{
    setActive((current)=> current < 4 ? current + 1 : current)
  }

  const prevStep = ()=>{
    setActive((current)=> current > 0 ? current - 1 : current)
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            {/* 1ST STEP */}
            <AddLocation 
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          {/* 2ND STEP */}
          <Stepper.Step label="Image" description="Upload">
            <UploadImage
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
                nextStep={nextStep}
                prevStep={prevStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Basic" description="Details">
            <BasicDetails
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                  nextStep={nextStep}
                  prevStep={prevStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Facilities" description="Details">
            <Facilities
                  propertyDetails={propertyDetails}
                  setPropertyDetails={setPropertyDetails}
                  prevStep={prevStep}
                  setOpened={setOpened}
                  setActive={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
