import { Button, Label } from "morse-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { AddCustomerSchema } from "~/schema/customer";
import { api } from "~/utils/api";
import { useZodForm } from "~/utils/useZodForm";

const AddCustomer: NextPage = () => {
  const router = useRouter();
  const mutation = api.customer.add.useMutation({
    onSuccess: async () => {
      await router.push("/customers");
    },
  });

  const methods = useZodForm({
    schema: AddCustomerSchema,
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      email: "",
      phone: "",
    },
  });

  return (
    <div>
      <h2>Add a Customer</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          methods.reset();
        })}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <input id="name" placeholder="Name" {...methods.register("name")} />
          {methods.formState.errors.name?.message && (
            <p>{methods.formState.errors.name?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="addressLine1">AddressLine1</Label>
          <input
            id="addressLine1"
            placeholder="AddressLine1"
            {...methods.register("addressLine1")}
          />
          {methods.formState.errors.addressLine1?.message && (
            <p>{methods.formState.errors.addressLine1?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="addressLine2">AddressLine2</Label>
          <input
            id="addressLine2"
            placeholder="AddressLine2"
            {...methods.register("addressLine2")}
          />
          {methods.formState.errors.addressLine2?.message && (
            <p>{methods.formState.errors.addressLine2?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="addressLine3">AddressLine3</Label>
          <input
            id="addressLine3"
            placeholder="AddressLine3"
            {...methods.register("addressLine3")}
          />
          {methods.formState.errors.addressLine3?.message && (
            <p>{methods.formState.errors.addressLine3?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...methods.register("email")}
          />
          {methods.formState.errors.email?.message && (
            <p>{methods.formState.errors.email?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            placeholder="Phone"
            {...methods.register("phone")}
          />
          {methods.formState.errors.phone?.message && (
            <p>{methods.formState.errors.phone?.message}</p>
          )}
        </div>

        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddCustomer;
