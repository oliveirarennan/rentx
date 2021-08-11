import ICreateUserDTO from "../dtos/ICreateUserDto";
import User from "../entities/User";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
