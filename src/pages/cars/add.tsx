import { Input, Label } from "morse-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { api } from "~/utils/api";
import { useZodForm } from "~/utils/useZodForm";

export const addCarSchema = z.object({
  make: z.string().nonempty("Make is required"),
  model: z.string().nonempty("Model is required"),
  year: z.coerce.number().min(1900, "Must be after 1900"),
  color: z.string().nonempty("Color is required"),
});

const AddCar: NextPage = () => {
  const router = useRouter();
  const mutation = api.car.add.useMutation({
    onSuccess: async () => {
      await router.push("/cars");
    },
  });

  const methods = useZodForm({
    schema: addCarSchema,
    defaultValues: {
      make: "",
      model: "",
      year: 2021,
      color: "",
    },
  });

  return (
    <div>
      <h2>Add a car</h2>
      <form
        onSubmit={(event) => {
          void methods.handleSubmit(async (values) => {
            await mutation.mutateAsync(values);
            methods.reset();
          })(event);
        }}
        className="space-y-2"
      >
        <div>
          <Label htmlFor="make">Make</Label>
          <Input id="make" placeholder="Make" {...methods.register("make")} />
          {methods.formState.errors.make?.message && (
            <p>{methods.formState.errors.make?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Model"
            {...methods.register("model")}
          />
          {methods.formState.errors.model?.message && (
            <p>{methods.formState.errors.model?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            type="number"
            id="year"
            placeholder="Year"
            {...methods.register("year")}
          />
          {methods.formState.errors.year?.message && (
            <p>{methods.formState.errors.year?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            placeholder="Color"
            {...methods.register("color")}
          />
          {methods.formState.errors.color?.message && (
            <p>{methods.formState.errors.color?.message}</p>
          )}
        </div>

        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
