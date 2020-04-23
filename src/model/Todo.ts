import mongoose, { Schema, Document } from 'mongoose';

export interface Todo extends Document {
    text: string;
    userId: string;
    isCompleted: boolean;
}

const TodoSchema: Schema = new Schema({
    text: { type: String, required: true },
    userId: { type: Schema.Types.String, required: true },
    isCompleted: { type: Schema.Types.Boolean, default: false }
});

export default mongoose.model<Todo>('Todo', TodoSchema);