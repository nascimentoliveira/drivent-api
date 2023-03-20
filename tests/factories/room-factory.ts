import faker from "@faker-js/faker";
import { Hotel, Room } from "@prisma/client";
import dayjs from "dayjs";
import { createdHotel } from "./hotels-factory";

export function createdRoom(capacity?: number, hotel?: Hotel): Room {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    capacity: capacity || faker.datatype.number({ max: 5 }),
    hotelId: hotel?.id || createdHotel().id,
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };
}
