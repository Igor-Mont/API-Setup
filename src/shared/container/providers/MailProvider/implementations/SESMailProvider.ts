import SES from "aws-sdk/clients/ses";
import fs from "fs";
import { compile } from "handlebars";
import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: SES;

  constructor() {
    this.client = new SES({
      region: 'us-east-1'
      // region: process.env.AWS_DEFAULT_REGION
    });
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const template = fs.readFileSync(path).toString("utf-8");

    const templateParse = compile(template);

    const templateHTML = templateParse(variables);

    await this.client.sendEmail({
      Source: 'Igor Nathan Monteiro Santos <igornathan717@gmail.com>',
      Destination: {
        ToAddresses: [
          'igornathan717@gmail.com'
        ],
      },
      Message: {
        Subject: {
          Data:  'Hello Mail',
        },
        Body: {
          Html: {
            Data: templateHTML
          },
          Text: {
            Data: "Envio feito com sucesso",
          }
        }
      },
      ConfigurationSetName: "Nathan"
    }, () => console.log('Send mail!'));
  }
}

export { SESMailProvider };