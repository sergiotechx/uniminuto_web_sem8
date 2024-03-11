import { NextResponse } from "next/server";
import { connectDB, getCurrentSession } from "@/lib/db/connection/connection";
import UserModel from "@/lib/db/models/users";
import { encryptPassword } from "@/lib/encryption/encryption";

//APi Post implementation
//TODO  user creation
export const POST = async (request: Request) => {

    try {
        let currentDbSession = getCurrentSession();
        if (currentDbSession.readyState != 1) {
            await connectDB();
        }
        let { email, password } = await request.json();

      //email and password fields are mandatory
        if (!email || !password) {
            return NextResponse.json({ error: 'fill email or password data' }, { status: 401 });
        }

       // 1 email account per user
        const existingUser = await UserModel.findByEmail(email);



        if (existingUser) {
            return NextResponse.json({ message: 'user already  exists' }, { status: 409 }); // Código 409 Conflict
        }
        //usermodel creation method calling
        let newUser = await UserModel.createUser(email, password);
        return NextResponse.json({ newuser: newUser }, { status: 200 })
    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


//APi GET implementation
//TODO user info 

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get("email");
        //Mandatory field
        if (!email) {
            return NextResponse.json({ fail: 'Not allowed' }, { status: 401 });
        }
        

        let currentDbSession = getCurrentSession();
        if (currentDbSession.readyState != 1) {
            await connectDB();
        }

        //get the user info by email
        let user = await UserModel.findByEmail(email)
        if (!user) {
            return NextResponse.json({ message: 'Not user found' }, { status: 404 });
        }
       
        return NextResponse.json({ data: user }, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}




