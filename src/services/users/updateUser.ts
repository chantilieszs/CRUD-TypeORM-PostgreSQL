import AppDataSource from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializers";

const updateUserService =  async (userData: IUserUpdate, userID: string): Promise<IUserUpdate> => {
    
    const  userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({
        id: userID
    })
    if (!findUser) {
        throw new AppError("user not found", 404)
    }
    if(!userData.email && !userData.name && !userData.password){
        throw new AppError ("Can't update it", 401)
    }
    const updatedUser = userRepository.create({
        ...findUser,
        ...userData
    })

    await userRepository.save(updatedUser)

    const updatedUserResponse = await userWithoutPasswordSerializer.validate(updatedUser, {
        stripUnknown: true
    })
    
    return updatedUserResponse
}

export default updateUserService;