import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Activity, ActivityLocal } from '@prisma/client';

async function getActivities(userId: number): Promise<
  (Activity & {
    ActivityLocal: ActivityLocal;
    ActivityRegistration: {
      id: number;
    }[];
  })[]
> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== 'PAID') {
    throw notFoundError();
  }

  /* if(ticket.TicketType.isRemote){
        throw
      } */
  const activities = await activitiesRepository.findActivities();
  return activities;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
