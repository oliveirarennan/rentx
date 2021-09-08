import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import auth from "@config/auth";
import UserTokensRepository from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = { id: user.user_id };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
