import type {Request, NextFunction , Response } from 'express'
import { ITask, Task } from '../models/Task'


declare global{
    namespace Express{
        interface Request{
            task: ITask
        }
    }
}

export async function taskExist(req: Request, res: Response, next: NextFunction){
    try{  
        const { taskId } = (req.params)
        const task = await Task.findById(taskId)
        if (!task) {
            const error = new Error('Tarea no encontrado')
            return res.status(404).json({ error: error.message })
        }
        
        req.task = task
        next()
    }catch(error) {
        console.log(error)
    }

}


export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction){
    try{  
        if (req.task.project.toString() !== req.project.id.toString()) return res.status(400).json({ error: new Error('La tarea no pertence a este proyecto').message })
        next()
    }catch(error) {
        console.log(error)
    }

    next()
}