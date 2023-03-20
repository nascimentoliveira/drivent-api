import faker from "@faker-js/faker";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { User } from "@prisma/client";

import { createUser } from "./users-factory";
import { prisma } from "@/config";
import dayjs from "dayjs";

export async function createEnrollmentWithAddress(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: incomingUser.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });
}

export function createhAddressWithCEP() {
  return {
    logradouro: "Avenida Brigadeiro Faria Lima",
    complemento: "de 3252 ao fim - lado par",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    uf: "SP",
  };
}

export function createdEnrollment(incomingUserId?: number) {
  const enrollmentId = faker.datatype.number();
  return {
    id: enrollmentId,
    name: faker.name.findName(),
    cpf: generateCPF(),
    birthday: faker.date.past(),
    phone: faker.phone.phoneNumber("(##) 9####-####"),
    userId: incomingUserId || faker.datatype.number(),
    Address: [{
      id: faker.datatype.number(),
      cep: faker.address.zipCode(),
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.helpers.arrayElement(getStates()).name,
      number: faker.datatype.number().toString(),
      neighborhood: faker.address.city(),
      addressDetail: "",
      enrollmentId: enrollmentId,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    }],
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };
}
