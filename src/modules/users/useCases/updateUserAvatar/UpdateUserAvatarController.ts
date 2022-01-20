import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user_id;

    const avatar_file = request.file.filename;
    console.log(avatar_file);

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ avatar_file, user_id });

    return response.status(204).send();
  }

}

export { UpdateUserAvatarController };