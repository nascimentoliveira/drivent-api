import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Enrollment, TicketStatus, TicketType } from "@prisma/client";
import dayjs from "dayjs";

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicketTypeRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export function createdTicketType(isRemote?: boolean, includesHotel?: boolean) {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    price: faker.datatype.number(),
    isRemote: isRemote || faker.datatype.boolean(),
    includesHotel: includesHotel || faker.datatype.boolean(),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };
}

export function createdTicket(enrollment?: Enrollment, ticketType?: TicketType, status?: TicketStatus) {
  const usedTicketType: TicketType = ticketType || createdTicketType();
  return {
    id: faker.datatype.number(),
    ticketTypeId: usedTicketType.id,
    TicketType: usedTicketType,
    enrollmentId: enrollment.id || faker.datatype.number(),
    status: status || faker.helpers.arrayElement(["RESERVED", "PAID"]),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };
}
