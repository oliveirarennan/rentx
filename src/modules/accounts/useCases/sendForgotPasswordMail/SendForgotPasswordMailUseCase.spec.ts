import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensReposiotyInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "FAKE DRIVER LICENCE",
      email: "fake@email.com",
      name: "Fake User Name",
      password: "senha@123",
    });

    await sendForgotPasswordMailUseCase.execute("fake@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a email if the user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("not_exists@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(userRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      driver_license: "FAKE DRIVER LICENCE 2",
      email: "fake2@email.com",
      name: "Fake2 User2 Name",
      password: "senha@123",
    });

    await sendForgotPasswordMailUseCase.execute("fake2@email.com");

    expect(generateTokenMail).toBeCalled();
  });
});
