import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entitie";
import { listUsersNoPass } from "../../serializers/user.serializers";

const listUsersService = async (): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userResoponse = await listUsersNoPass.validate(users, {
    stripUnknown: true,
  })

  return userResoponse;
};

export default listUsersService;
