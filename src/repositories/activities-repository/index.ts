import { prisma } from "@/config";
import { Activity, ActivityLocal } from "@prisma/client";

async function findActivities(): Promise<
  (Activity & {
    ActivityLocal: ActivityLocal;
    ActivityRegistration: {
      id: number;
    }[];
  })[]
  > {
  return prisma.activity.findMany({
    include: {
      ActivityLocal: true,
      ActivityRegistration: {
        select: {
          id: true,
        },
      },
    },
  });
}

async function findActivitiesLocals(): Promise<ActivityLocal[]> {
  return prisma.activityLocal.findMany();
}

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
  findActivities,
  findActivitiesLocals,
  findActivitiesByLocals,
};

export default activitiesRepository;
