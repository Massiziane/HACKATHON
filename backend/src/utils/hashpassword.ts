import bcrypt from 'bcrypt';

// Password Hashing
export const HashPassword = async (password : string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Comparaison de passwords
export const ComparePassword = async (password : string, hashedPassword : string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};