import ICreateUserDto from "../../dtos/ICreateUserDto";
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDto): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}
