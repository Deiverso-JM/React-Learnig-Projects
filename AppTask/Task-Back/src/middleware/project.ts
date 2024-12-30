import type {Request, NextFunction , Response } from 'express'
import Project, { IProject } from '../models/project'

declare global{
    namespace Express{
        interface Request{
            project: IProject
        }
    }
}

export async function projectExist(req: Request, res: Response, next: NextFunction){
    try{  
        const { projectId } = (req.params)
        const projectExist = await Project.findById(projectId)
        if (!projectExist) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ error: error.message })
        }
        
        req.project = projectExist
        next()
    }catch(error) {
        return res.status(500).json({ error: 'Hubo un error' });
    }

}