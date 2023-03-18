import { prisma } from "@/config";
import { Activity, ActivityLocal } from "@prisma/client";

function findActivitiesByLocals(): Promise<
  (ActivityLocal & {
    Activity: (Activity & {
      ActivityRegistration: {
          id: number;
      }[];
    })[];
  })[]> {
  return prisma.activityLocal.findMany({
    include: {
      Activity: {
        orderBy: {
          startsAt: "asc",
        },
        include: {
          ActivityRegistration: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

const activitiesRepository = {
  findActivitiesByLocals,
};

export default activitiesRepository;
