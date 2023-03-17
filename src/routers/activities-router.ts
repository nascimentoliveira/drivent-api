import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivitiesLocals } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivitiesLocals)
  .post("/:activityId", )
  .delete("/:activityId", );

export { activitiesRouter };
