import bcrypt from "bcrypt";

export const comparePassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    try {
        const res = await bcrypt.compare(password, hashedPassword);
        return res;
    }
    catch (error) {
        throw error;
    }
};

export const encryptPassword = async (password: string): Promise<string> => {
    try {
        
        const salt = await bcrypt.genSalt(10)
        const crypted = await bcrypt.hash(password, salt)
        return crypted;
    }
    catch (error:any) {
        
        throw error;
    }
};
