import type { Request, Response } from "express";
import { Task } from "../models/Task";


export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const newTask = new Task(req.body)

            newTask.project = req.project.id
            req.project.tasks.push(newTask.id)
            await Promise.allSettled([newTask.save(), req.project.save()])

            return res.status(202).json('Tarea creada correctamente')

        } catch (error) {
            console.log(error)
        }
    }



    static getAllTaskProject = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            return res.status(202).json(tasks)

        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }


    static getTaskProjectById = async (req: Request, res: Response) => {
        try {
            if (req.task.project.toString() !== req.project.id.toString()) return res.status(400).json({ error: new Error('La tarea no pertence a este proyecto').message })
            return res.status(202).json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }


    static updateTaskProjectById = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            return res.status(202).json('Tarea actualizada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }

    static deleteTaskProjectById = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter((taskSummary) => taskSummary.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            return res.status(202).json('Tarea eliminada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }


    static updateStatusTask = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            return res.json('status de la tarea actualizado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }




}