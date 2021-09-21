import { inject, injectable } from "tsyringe";

import IUserResponseDto from "@modules/accounts/dtos/IUserResponseDto";
import UserMap from "@modules/accounts/mapper/UserMap";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

@injectable()
export default class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDto> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDto(user);
  }
}
