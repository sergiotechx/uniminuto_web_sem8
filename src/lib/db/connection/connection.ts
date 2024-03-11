import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

export const connectDB = async () => {
    try {
       const {connection } =  await mongoose.connect(MONGODB_URI);
      if(connection.readyState==1){
        console.log('mongoDB connected');
        console.log("Connected to: ", connection.name);
        return Promise.resolve(true);
    
      } 
    }
    catch (error) {
        throw new Error(`Db connection error: ${error}`)
        return Promise.reject(false);
    }
}

// Nueva función para obtener la sesión actual
export const getCurrentSession = () => {
    return mongoose.connection;
}