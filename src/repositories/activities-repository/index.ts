import { prisma } from '@/config';
import { Activity, ActivityLocal } from '@prisma/client';

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
const activitiesRepository = {
  findActivities,
};

export default activitiesRepository;
