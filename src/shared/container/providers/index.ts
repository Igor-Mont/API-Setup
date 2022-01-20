import { container } from "tsyringe";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

// container.registerSingleton<IMailProvider>("EtheralMailProvider", EtherealMailProvider);
container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
