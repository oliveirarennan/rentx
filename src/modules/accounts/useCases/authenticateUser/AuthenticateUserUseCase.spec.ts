import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDto";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "fakeuser@test.com",
      password: "123456",
      name: "Fake User",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fake@test.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with a incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "fakeuser@test.com",
        password: "123456",
        name: "Fake User",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "WRONG_PASSWORD",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with a incorrect email", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "fakeuser@test.com",
        password: "123456",
        name: "Fake User",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "incorrect@test.com",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
