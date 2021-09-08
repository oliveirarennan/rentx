import ICreateUserTokenDto from "../dtos/ICreateUserTokenDto";
import UserTokens from "../infra/typeorm/entities/UserTokens";

export default interface IUserTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDto): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}
