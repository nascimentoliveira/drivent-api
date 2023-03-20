import enrollmentRepository from "@/repositories/enrollment-repository";
import bookingService from "@/services/booking-service";
import ticketRepository from "@/repositories/ticket-repository";
import faker from "@faker-js/faker";
import { createdEnrollment, createdTicket, createdTicketType } from "../factories";
import { Address, Enrollment, Ticket, TicketType } from "@prisma/client";

describe("BookingService test suite", () => {
  it("should not reserve a room for a user without a enrollment", async () => {
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementation((): Promise<Enrollment & { Address: Address[];}> => {
      return new Promise((resolve) => {
        resolve(undefined);
      });
    });

    const promise = bookingService.bookingRoomById(faker.datatype.number(), faker.datatype.number());
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user without a ticket", async () => {
    const userId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementation((): Promise<Enrollment & { Address: Address[];}> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });

    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementation((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(undefined);
      });
    });

    const promise = bookingService.bookingRoomById(userId, faker.datatype.number());
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user with an paid ticket", async () => {
    const userId: number = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType();
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "RESERVED");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementation((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementation((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, faker.datatype.number());
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user with an online ticket", async () => {
    const userId: number = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(true, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementation((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementation((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, faker.datatype.number());
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not book a room for a user with a ticket that does not include hotel", async () => {
    const userId: number = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(false, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementation((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementation((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, faker.datatype.number());
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });
});

