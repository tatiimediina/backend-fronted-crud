import { Router } from "express";
import {
  getTasks,
  addTasks,
  getById,
  editTasks,
  deleteTasks,
} from "../controllers/tasks.controllers.js";
import {
  validateAddTask,
  validateEditTask,
  validateIdTask,
} from "../validations/tasks.validations.js";
import { applyValidations } from "../middlewares/apply.validations.js";
const tasksRouter = Router();

tasksRouter.get("/", getTasks);
tasksRouter.post("/", validateAddTask, applyValidations, addTasks);

tasksRouter.get("/:id", validateIdTask, getById);
tasksRouter.patch(
  "/:id",
  validateIdTask,
  validateEditTask,
  applyValidations,
  editTasks
);
tasksRouter.delete("/:id", validateIdTask, deleteTasks);

export { tasksRouter };
