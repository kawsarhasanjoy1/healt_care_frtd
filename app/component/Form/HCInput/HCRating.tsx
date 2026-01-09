import { Rating } from "@smastrom/react-rating";
import { Controller, useFormContext } from "react-hook-form";
import '@smastrom/react-rating/style.css'

const HCRating = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="rating"
      render={({ field }) => (
        <Rating
          style={{ maxWidth: 180 }}
          value={field.value}
          onChange={field.onChange}
          isRequired
        />
      )}
    />
  );
};


export default HCRating