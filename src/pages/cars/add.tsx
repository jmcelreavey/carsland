import { type NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/api";
import { useZodForm } from "~/lib/utils";

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
    <div className="m-8 flex h-screen flex-col">
      <h2 className="mb-2 text-2xl font-bold">Add a car</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          methods.reset();
        })}
        className="space-y-2"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="make">Make</Label>
          <Input id="make" placeholder="Make" {...methods.register("make")} />
          {methods.formState.errors.make?.message && (
            <p className="text-sm text-muted-foreground text-red-700">
              {methods.formState.errors.make?.message}
            </p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Model"
            {...methods.register("model")}
          />
          {methods.formState.errors.model?.message && (
            <p className="text-sm text-muted-foreground text-red-700">
              {methods.formState.errors.model?.message}
            </p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="year">Year</Label>
          <Input
            type="number"
            id="year"
            placeholder="Year"
            {...methods.register("year")}
          />
          {methods.formState.errors.year?.message && (
            <p className="text-sm text-muted-foreground text-red-700">
              {methods.formState.errors.year?.message}
            </p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            placeholder="Color"
            {...methods.register("color")}
          />
          {methods.formState.errors.color?.message && (
            <p className="text-sm text-muted-foreground text-red-700">
              {methods.formState.errors.color?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-primary-500 border p-2 font-bold"
        >
          {mutation.isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
