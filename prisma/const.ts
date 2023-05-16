import type { Car } from "@prisma/client";

export const CARS: Omit<Car, "createdAt" | "updatedAt">[] = [
  {
    id: "TYB-123",
    make: "Toyota",
    model: "Yaris",
    year: 2007,
    color: "Blue",
  },
  {
    id: "TYB-124",
    make: "Toyota",
    model: "Yaris",
    year: 2007,
    color: "Red",
  },
  {
    id: "TYB-125",
    make: "Toyota",
    model: "Yaris",
    year: 2007,
    color: "Green",
  },
  {
    id: "TYB-126",
    make: "Toyota",
    model: "Yaris",
    year: 2007,
    color: "Yellow",
  },
];
