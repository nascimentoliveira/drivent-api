import enrollmentRepository from "@/repositories/enrollment-repository";
import bookingService from "@/services/booking-service";
import ticketRepository from "@/repositories/ticket-repository";
import faker from "@faker-js/faker";
import { createdBooking, createdEnrollment, createdTicket, createdTicketType, createdRoom } from "../factories";
import { Address, Booking, Enrollment, Room, Ticket, TicketType } from "@prisma/client";
import roomRepository from "@/repositories/room-repository";
import bookingRepository from "@/repositories/booking-repository";

describe("BookingService test suite", () => {
  it("should not reserve a room for a user without a enrollment", async () => {
    const userId = faker.datatype.number();
    const roomId = faker.datatype.number();
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.bookingRoomById(userId, roomId);
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user without a ticket", async () => {
    const userId = faker.datatype.number();
    const roomId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[];}> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });

    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.bookingRoomById(userId, roomId);
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user with an paid ticket", async () => {
    const userId: number = faker.datatype.number();
    const roomId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType();
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "RESERVED");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, roomId);

    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not reserve a room for a user with an online ticket", async () => {
    const userId: number = faker.datatype.number();
    const roomId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(true, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, roomId);
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not book a room for a user with a ticket that does not include hotel", async () => {
    const userId: number = faker.datatype.number();
    const roomId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(false, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");
    
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    const promise = bookingService.bookingRoomById(userId, roomId);

    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });

  it("should not book a room when not found", async () => {
    const userId: number = faker.datatype.number();
    const roomId = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(false, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    jest.spyOn(roomRepository, "findById").mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.bookingRoomById(userId, roomId);

    expect(promise).rejects.toEqual({
      name: "NotFoundError",
      message: "No result for this search!",
    });
  });

  it("should not book a room when the room is fully booked", async () => {
    const userId: number = faker.datatype.number();
    const enrollment: Enrollment & { Address: Address[]; } = createdEnrollment(userId);
    const ticketType: TicketType = createdTicketType(false, false);
    const ticket: Ticket & { TicketType: TicketType; } = createdTicket(enrollment, ticketType, "PAID");
    const room: Room  = createdRoom();

    expect(room).toBe(1);

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): Promise<Enrollment & { Address: Address[]; }> => {
      return new Promise((resolve) => {
        resolve(enrollment);
      });
    });
    
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): Promise<Ticket & { TicketType: TicketType; }> => {
      return new Promise((resolve) => {
        resolve(ticket);
      });
    });

    jest.spyOn(roomRepository, "findById").mockImplementationOnce((): Promise<Room> => {
      return new Promise((resolve) => {
        resolve(room);
      });
    });

    jest.spyOn(bookingRepository, "findByRoomId").mockImplementationOnce((): Promise<(Booking & { Room: Room; })[]> => {
      return new Promise((resolve) => {
        resolve(Array(room.capacity).fill("").map(() => createdBooking(room)));
      });
    });

    const promise = bookingService.bookingRoomById(userId, room.id);
    expect(promise).rejects.toEqual({
      name: "CannotBookingError",
      message: "Cannot booking this room!",
    });
  });
});

