import mongoose , {Schema, Document} from "mongoose";

export interface IUSer extends Document {
    email: string
    password: string
    name: string 
    confirmed: boolean
}


const userShema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
})


const User = mongoose.model<IUSer>('User', userShema)
export default User