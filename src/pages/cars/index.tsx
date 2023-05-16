import { type Car } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { UserNav } from "~/components/core/user-nav";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/lib/api";

export const metadata: Metadata = {
  title: "Cars - Carsland",
};

const Cars: NextPage = () => {
  const cars = api.car.getAll.useQuery();
  const deleteCar = api.car.delete.useMutation();

  const columns: ColumnDef<Car, Car>[] = [
    {
      accessorKey: "make",
      header: "Make",
    },
    {
      accessorKey: "model",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      accessorKey: "edit",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end space-x-2">
            <Link href={`/cars/${row.original.id}/edit`}>
              <Button variant="link">Edit</Button>
            </Link>
            <Button
              variant="link"
              onClick={async () => {
                await deleteCar.mutateAsync(row.original);
                await cars.refetch();
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          Carsland
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex">
          <h2 className="text-3xl font-bold tracking-tight">Cars</h2>
          <div className="ml-auto">
            <Link href="/cars/add">
              <Button>Add</Button>
            </Link>
          </div>
        </div>
        <div className="items-center justify-between space-y-2">
          {cars.data && <DataTable data={cars.data} columns={columns} />}
        </div>
      </div>
    </div>
  );
};

export default Cars;
