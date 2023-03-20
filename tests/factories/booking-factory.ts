import faker from "@faker-js/faker";
import { prisma } from "@/config";
import dayjs from "dayjs";
import { Room } from "@prisma/client";
import { createdRoom } from "./room-factory";

type CreateBookingParams = {
  roomId: number,
  userId: number,
}

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    }
  });
}

export function createdBooking(room?: Room, userId?: number) {
  const useRomm: Room = room || createdRoom();
  return {
    id: faker.datatype.number(),
    userId: userId || faker.datatype.number(),
    roomId: useRomm.id,
    Room: useRomm,
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };
}

