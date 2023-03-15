import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, listActivitiesLocals } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/locals",listActivitiesLocals)
  .post("/:activityId", )
  .delete("/:activityId", );

export { activitiesRouter };
