import { Router } from 'express';
import { getTasks,addTasks, getById, editTasks, deleteTasks } from '../controllers/tasks.controllers.js';
const tasksRouter = Router();

tasksRouter.get('/', getTasks);
tasksRouter.post('/', addTasks);

tasksRouter.get('/:id', getById)
tasksRouter.patch('/:id', editTasks);
tasksRouter.delete('/:id', deleteTasks) 


export { tasksRouter };