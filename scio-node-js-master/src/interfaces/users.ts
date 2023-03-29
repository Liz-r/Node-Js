import mongoose, { Schema } from "mongoose"; 

import { User } from "../models/users";

const UserSchema: Schema = new Schema({
    
        username:{type: String, required: true},
        password:{type: String, required: true},

},
{timestamps: true})
export default mongoose.model<User>('users', UserSchema)