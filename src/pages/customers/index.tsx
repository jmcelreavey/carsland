import { type Customer } from "@prisma/client";
import { Button, Table } from "morse-react";
import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

export const metadata: Metadata = {
  title: "Customers - McCauslands",
};

const Customers: NextPage = () => {
  const customers = api.customer.getAll.useQuery();

  return (
    <div>
      <Button>
        <Link href="/customers/add">New Customer</Link>
      </Button>
      {customers.data && (
        <CustomersTable
          afterDelete={async () => {
            await customers.refetch();
          }}
          customers={customers.data}
        />
      )}
    </div>
  );
};

const CustomersTable = ({
  customers,
  afterDelete,
}: {
  customers: Customer[];
  afterDelete: () => Promise<void>;
}) => {
  const deleteCustomer = api.customer.delete.useMutation();

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>AddressLine1</Table.HeaderCell>
          <Table.HeaderCell>AddressLine1</Table.HeaderCell>
          <Table.HeaderCell>AddressLine1</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {customers.map((customer) => (
          <Table.Row key={customer.id}>
            <Table.Cell>{customer.name}</Table.Cell>
            <Table.Cell>{customer.addressLine1}</Table.Cell>
            <Table.Cell>{customer.addressLine2}</Table.Cell>
            <Table.Cell>{customer.addressLine3}</Table.Cell>
            <Table.Cell>{customer.email}</Table.Cell>
            <Table.Cell>{customer.phone}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center justify-end space-x-2">
                <Link href={`/customers/${customer.id}/edit`}>
                  <Button appearance={Button.Appearance.Text}>Edit</Button>
                </Link>
                <Button
                  appearance={Button.Appearance.Text}
                  onClick={async () => {
                    await deleteCustomer.mutateAsync(customer);
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

export default Customers;
