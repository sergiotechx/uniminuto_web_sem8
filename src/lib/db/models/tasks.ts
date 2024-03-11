import { comparePassword, encryptPassword } from "@/lib/encryption/encryption";
import * as typegoose from "@typegoose/typegoose";
import { models } from "mongoose";
import UserModel, { User } from "./users";

@typegoose.modelOptions({ schemaOptions: { timestamps: true, versionKey: false, collection: 'tasks' } })

export class Task {
    @typegoose.prop({ ref: () => 'User' })
    user: typegoose.Ref<User>;
    @typegoose.prop({
        required: [true, "Task description is required"],
        unique: true,
        minLength: [3, 'Task description must be at leat 3 charaters'],
        maxLength: [50, 'Task description must be at most 50 charaters']
    })
    description: string;
    @typegoose.prop({
        default: false
    })
    done: boolean;

    //Task creation
    //task status done is false by default
    static async createTask(this: typegoose.ReturnModelType<typeof Task>,taskData: Partial<{user: string; description: string}>) {
        try {
            
            return this.create(taskData)
        }
        catch (error: any) {
            throw error;
        }
    }
    //get all task by and especific user
    static async getTasks(this: typegoose.ReturnModelType<typeof Task>, userId:string) {
        try {
            return this.find({user: userId})
        }
        catch (error: any) {
            throw error;
        }
    }
    //delete specific task
    static async deleteTask(this: typegoose.ReturnModelType<typeof Task>, taskId: string) {
        try {
            const result = await this.deleteOne({ _id: taskId });
            if (result.deletedCount === 0) {
                return null; // No se encontró la tarea o no se pudo borrar
            }
            return result; // Retorna el resultado de la operación de borrado
        } catch (error: any) {
            throw error;
        }
    }
    
    //update a task
    static async updateTask(this: typegoose.ReturnModelType<typeof Task>, taskId: string ,taskData: {description: string, done:boolean}) {
        try {
           
            const updatedTask = await this.findOneAndUpdate({ _id: taskId }, taskData, { new: true });
            return updatedTask;
        } 
        catch (error: any) {
            throw error;
        }
    }

    

}
let TaskModel: any;
try {
    TaskModel = models.Task || typegoose.getModelForClass(Task);
}
catch (error: any) {
    throw error;
}
export default TaskModel;




