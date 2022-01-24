import { container } from "tsyringe";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
container.registerSingleton<IStorageProvider>("LocalStorageProvider", LocalStorageProvider);
