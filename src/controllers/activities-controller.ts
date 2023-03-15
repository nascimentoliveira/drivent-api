import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";
import activitiesService from "@/services/activities-service";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const activities = await activitiesService.getActivities(userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}