import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Activity, ActivityLocal } from "@prisma/client";

async function getActivities(userId: number): Promise<
  Record<string, Record<string, (ActivityLocal & {
    Activity: (Activity & {
      ActivityRegistration: {
        id: number,
      }[]
    })[]
  })>>
> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== "PAID") {
    throw notFoundError();
  }

  type ActivityAndRegistration = (Activity & {
    ActivityRegistration: {
      id: number,
    }[]
  });

  const locals: (ActivityLocal & { Activity: ActivityAndRegistration[] })[] = await activitiesRepository.findActivitiesByLocals();
  const localsByDate: Record<string, Record<string, (ActivityLocal & { Activity: ActivityAndRegistration[] })>> = {};

  locals.map((local) => {
    local.Activity.map((activity) => {
      const activityDate = formatDate(new Date(activity.startsAt).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }));
      if (!localsByDate[activityDate]) {
        localsByDate[activityDate] = {};
        locals.map(l => {
          localsByDate[activityDate][l.id] = {
            ...l,
            Activity: [],
          };
        });
      }
      localsByDate[activityDate][local.id].Activity = local.Activity.filter((a) => formatDate(new Date(a.startsAt).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" })) === activityDate);
    });
  });
  
  return localsByDate;
}

function formatDate(date: string): string {
  return (date.charAt(0).toUpperCase() + date.slice(1)).replace("-feira", "");
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
