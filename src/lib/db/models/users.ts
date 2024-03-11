import { comparePassword, encryptPassword } from "@/lib/encryption/encryption";
import { getModelForClass, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { models } from "mongoose";
//timestamp fields addition per record: modificationAt and creationAt
@modelOptions({ schemaOptions: { timestamps: true, versionKey: false, collection: 'users' } })

export class User {
    @prop({
        lowercase: true,
        required: [true, "Email is required"],
        unique: true,
        //valid email pattern
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
    })
    email: string;
    @prop({ required: [true, "Password is required"], })
    password: string;
// User creation 
    static async createUser(this: ReturnModelType<typeof User>,  email: string, password: string ) {
        try {
            //password encription
            password = await encryptPassword(password)
            let newUser = await this.create({email:email, password:password})
            return newUser
        }
        catch (error: any) {
            throw error;
        }
    }
    //user login validation
    static async login(this: ReturnModelType<typeof User>, email: string, password: string) {
        try {

            const user = await this.findOne({ email: email });

            let pass = await comparePassword(user?.password, password);
            if (pass) {
                return true
            }
            else {
                return false;
            }
        }
        catch (error: any) {
            return false;
        }
    }
   //get the user info by email 
    static async findByEmail(this: ReturnModelType<typeof User>, email: string) {
        try {
            const user = await this.findOne({ email: email});
            return user;
        }
        catch (error: any) {
           
            return null;
        }
    }
}

let UserModel: any;
try {
    UserModel = models.User || getModelForClass(User);
}
catch (error: any) {
    throw error;
}
export default UserModel;

