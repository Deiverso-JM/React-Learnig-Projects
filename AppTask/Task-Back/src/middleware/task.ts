import type { Request, NextFunction, Response } from 'express';
import { ITask, Task } from '../models/Task';

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

// Middleware para verificar si la tarea existe
export async function taskExist(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    req.task = task;
    next();  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}


export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.task.project.toString() !== req.project.id.toString()) {
      return res.status(400).json({ error: 'La tarea no pertenece a este proyecto' });
    }

    next();  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}
