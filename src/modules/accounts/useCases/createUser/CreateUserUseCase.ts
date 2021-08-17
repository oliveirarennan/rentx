import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import ICreateUserDto from "@modules/accounts/dtos/ICreateUserDto";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Email already taken");
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}
