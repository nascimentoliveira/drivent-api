import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .post("/:activityId", )
  .delete("/:activityId", );

export { activitiesRouter };
