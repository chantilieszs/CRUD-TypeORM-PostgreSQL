import { IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entitie";
import AppError from "../../errors/AppError";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializers";

const createUserService = async (
  userData: IUserRequest
): Promise<typeof userResoonse> => {
  const userRepository = AppDataSource.getRepository(User);
  const verifyingUser = await userRepository.findOneBy({
    email: userData.email,
  });
  if (verifyingUser) {
    throw new AppError("Email already exists", 400);
  }
  const user = userRepository.create(userData);

  await userRepository.save(user);

  const userResoonse = await userWithoutPasswordSerializer.validate(user, {
    stripUnknown: true,
  });

  return userResoonse;
};

export default createUserService;
