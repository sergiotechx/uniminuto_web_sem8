import { NextResponse } from "next/server";
import { connectDB, getCurrentSession } from "@/lib/db/connection/connection";
import TaskModel from "@/lib/db/models/tasks";
import UserModel from "@/lib/db/models/users";


//APi Post implementation
//TODO  task creation

export const POST = async (request: Request) => {

    try {
        let { email, description } = await request.json();
        //email and description are mandatory
        
        if (!email || !description) {
            return NextResponse.json({ error: 'fill email or description data' }, { status: 401 });
        }
        let currentDbSession = getCurrentSession();
        if (currentDbSession.readyState != 1) {
            await connectDB();
        }
       
        //the task is linked to and existing user
        const existingUser = await UserModel.findByEmail(email);
        
        if (!existingUser) {
            return NextResponse.json({ message: 'user not found' }, { status: 409 }); // Código 409 Conflict
        }

        //taskmodel creation task method calling
        let newTask = await TaskModel.createTask({user:existingUser._id,description:description})
        return NextResponse.json({ newTask: newTask }, { status: 200 })
    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export const PATCH = async (request: Request) => {

    try {
        let { taskId, description, done } = await request.json();
        //email and description are mandatory
        
        if (!taskId||!description ) {
            return NextResponse.json({ error: 'fill taskId or  description data' }, { status: 401 });
        }
        let currentDbSession = getCurrentSession();
        if (currentDbSession.readyState != 1) {
            await connectDB();
        }
       
        //taskmodel updating task method calling
        let updatedTask = await TaskModel.updateTask(taskId,{description:description, done:done})
        return NextResponse.json({updatedTask: updatedTask }, { status: 200 })
    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
//APi get implementation
//TODO all list retrieval by user

export const GET = async (request: Request) => {

    try {
        const url = new URL(request.url);
        const email = url.searchParams.get("email");
        //email is mandatory
        if (!email ) {
            return NextResponse.json({ error: 'fill email data' }, { status: 401 });
        }
        let currentDbSession = getCurrentSession();
        if (currentDbSession.readyState != 1) {
            await connectDB();
        }

        //the task is linked to and existing user
        const existingUser = await UserModel.findByEmail(email);
   
        if (!existingUser) {
            return NextResponse.json({ message: 'user not found' }, { status: 409 }); // Código 409 Conflict
        }
       
       // get task list by and especifc user thouhg the task model
        const tasks = await TaskModel.getTasks(existingUser._id)
        return NextResponse.json({ taskList: tasks }, { status: 200 })
    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}