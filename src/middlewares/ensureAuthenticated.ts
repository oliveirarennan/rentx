import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import AppError from "../errors/AppError";
import UsersRepository from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "889b48fb68bb4f625f785d4ca2fb3f949adc9d6233d812dec520b18d23c22eb6"
    ) as IPayload;

    const usersRepository = container.resolve(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = { id: user.id };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
