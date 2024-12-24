import bcrypt from "bcrypt"

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export const checkPassword = async(password: string, storedHash: string) => {
    return await bcrypt.compare(password, storedHash)
}