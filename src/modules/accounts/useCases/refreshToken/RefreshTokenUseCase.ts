import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
/**
 * Receber o RefreshToken de autenticação
 */

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export default class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const { sub, email } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }
    await this.userTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_tokens_days
    );

    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    return new_refresh_token;
  }
}
