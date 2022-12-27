import { IUserLogin } from "../../interfaces/users";
import  jwt  from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config"
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { User } from "../../entities";

const loginService = async ({email, password}: IUserLogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        email:email
    })

    if(!user) {
        throw new AppError("User or password invalid!", 403)
    }

    const passordMatch = await compare(password, user?.password)

    if(!passordMatch) {
        throw new AppError("User or password invalid!", 403)
    }
    
    const token = jwt.sign(
        {
            isAdm: user.isAdm,
            isActive: user.isActive
        },
        String(process.env.SECRET_KEY),
        {
            subject: String(user.id),
            expiresIn: "24h"
        }
    )
    return token
}

export default loginService;