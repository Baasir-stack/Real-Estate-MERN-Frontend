import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
    },

    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 dollars" : null,
    },
  });

  const { title, description, price } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, description, price, title }));
      nextStep();
    }
  };
  return (
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
          <TextInput
            w={"100%"}
            withAsterisk
            label="Title"
            placeholder="Property Name"
            {...form.getInputProps("title")}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Description"
            {...form.getInputProps("description", { type: "input" })}
          />

          <NumberInput
            withAsterisk
            label="Price"
            placeholder="1000"
            min={0}
            {...form.getInputProps("price")}
          />
        </div>

        {/* right side */}
      </div>

      <Group position="center" mt={"xl"}>
        <Button default="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default BasicDetails;
