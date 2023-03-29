import { Document } from "mongoose";

export interface movie extends Document {
  title: string;
  year: number;
}
