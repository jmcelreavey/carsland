import { type Car } from "@prisma/client";
import { Button, Table } from "morse-react";
import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

export const metadata: Metadata = {
  title: "Cars - Carsland",
};

const Cars: NextPage = () => {
  const cars = api.car.getAll.useQuery();

  return (
    <div>
      <Button>
        <Link href="/cars/add">New Car</Link>
      </Button>
      {cars.data && (
        <CarsTable
          afterDelete={async () => {
            await cars.refetch();
          }}
          cars={cars.data}
        />
      )}
    </div>
  );
};

const CarsTable = ({
  cars,
  afterDelete,
}: {
  cars: Car[];
  afterDelete: () => Promise<void>;
}) => {
  const deleteCar = api.car.delete.useMutation();

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Make</Table.HeaderCell>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Color</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {cars.map((car) => (
          <Table.Row key={car.id}>
            <Table.Cell>{car.make}</Table.Cell>
            <Table.Cell>{car.model}</Table.Cell>
            <Table.Cell>{car.year}</Table.Cell>
            <Table.Cell>{car.color}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center justify-end space-x-2">
                <Link href={`/cars/${car.id}/edit`}>
                  <Button appearance={Button.Appearance.Text}>Edit</Button>
                </Link>
                <Button
                  appearance={Button.Appearance.Text}
                  onClick={async () => {
                    await deleteCar.mutateAsync(car);
                    await afterDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Cars;
