import mongoose, {Schema, Document, PopulatedDoc} from "mongoose";
import { ITask, Task } from "./Task";

export interface IProject extends Document {
    projectName: string
    clientName: string 
    description: string 
    tasks: PopulatedDoc<ITask & Document>[]
}

const ProjectSchema:Schema = new Schema({
    projectName: {
        type: String,
        require: true,
        trim: true
    },
    clientName: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]

}, {timestamps: true})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project