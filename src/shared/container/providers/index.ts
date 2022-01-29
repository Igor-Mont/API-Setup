import { container } from "tsyringe";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { SESMailProvider } from "./MailProvider/implementations/SESMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

const sendMail = {
  ses: SESMailProvider,
  etheral: EtherealMailProvider
}

container.registerInstance<IMailProvider>("SESMailProvider", new sendMail[process.env.mail]());

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.disk]);
