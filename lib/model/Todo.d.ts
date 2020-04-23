import mongoose, { Document } from 'mongoose';
export interface Todo extends Document {
    text: string;
    userId: string;
    isCompleted: boolean;
}
declare const _default: mongoose.Model<Todo, {}>;
export default _default;
