import mongoose , {Schema, Document, Types} from "mongoose";

export interface IToken extends Document {
    token: string
    user: Types.ObjectId
    createdAt: Date
}


const tokenShema: Schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        ref: 'User'
    },  
    usecreatedAtr: {
        type: Date,
        default: Date.now(),
        expires: "10m"
    },  
})


const Token = mongoose.model<IToken>('Token', tokenShema)
export default Token