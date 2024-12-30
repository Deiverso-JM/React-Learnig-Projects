import { z } from "zod";

// Auth
export const authSchema = z.object({
    current_password: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

type Auth = z.infer<typeof authSchema>
export type ConfirmToken = Pick<Auth, 'token'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'name' | 'password_confirmation'>
export type NewCurrentPasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>
export type CheckPasswordForm = Pick<Auth, 'password'>

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

// Teams 
export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true,
})

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>

// Notes

export const notesSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof notesSchema>
export type NoteFormData = Pick<Note, 'content'>



//Task
export const taskStatusShema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusShema>

export const taskSchema = z.object({
    _id: z.string(),
    createdAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusShema
    })),
    description: z.string(),
    name: z.string(),
    notes: z.array(notesSchema.extend({
        createdBy: userSchema
    })),
    project: z.string(),
    status: taskStatusShema,
    updatedAt: z.string()
})



export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>


// Projects

export const TaskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
})

export type TaskProject = z.infer<typeof TaskProjectSchema>


export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(TaskProjectSchema),
    team: z.array(z.string(userSchema.pick({ _id: true })))
})


export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

