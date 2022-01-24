import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { S3StorageProvider } from "@shared/container/providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  avatar_file: string;
  user_id: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const s3_avatar_url = await this.storageProvider.save(avatar_file, "avatar");

    if(!user.avatar_url) {
      user.avatar_url = s3_avatar_url;

      this.usersRepository.save(user);
    }

    const last = user.avatar_url.lastIndexOf("/");
    const lengthURL = user.avatar_url.length;
    const fileURL = user.avatar_url.toString().slice(last + 1, lengthURL );
    const file = user.avatar_url.includes("https") ? fileURL : avatar_file

    await this.storageProvider.delete(file, "avatar");

    user.avatar_url = s3_avatar_url.includes("https") ? s3_avatar_url : avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatarUseCase };