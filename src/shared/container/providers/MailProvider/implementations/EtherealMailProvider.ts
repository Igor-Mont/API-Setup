import { createTestAccount, Transporter, createTransport, getTestMessageUrl } from "nodemailer";
import { compile } from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    createTestAccount().then(account => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;

    }).catch(err => console.error(err));
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const template = fs.readFileSync(path).toString("utf-8");

    const templateParse = compile(template);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Setup <noreplay@api.com>",
      subject,
      html: templateHTML
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };