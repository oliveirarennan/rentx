import { classToClass } from "class-transformer";

import IUserResponseDto from "../dtos/IUserResponseDto";
import User from "../infra/typeorm/entities/User";

export default class UserMap {
  static toDto({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDto {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
