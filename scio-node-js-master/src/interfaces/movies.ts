import mongoose, { Schema } from "mongoose"; 

import { movie } from "../models/movies";

const MoviesSchema: Schema = new Schema({
    
        title:{type: String, required: true},
        year:{type: Number, required: true},

},
{timestamps: true})
export default mongoose.model<movie>('movie', MoviesSchema)