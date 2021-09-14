import IMailProvider from "../IMailProvider";

type Message = {
  to: string;
  subject: string;
  variables: any;
  path: string;
};

export default class MailProviderInMemory implements IMailProvider {
  private messages: Message[] = [];
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
