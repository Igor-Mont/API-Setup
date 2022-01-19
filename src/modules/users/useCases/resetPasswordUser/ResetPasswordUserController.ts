import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { token } = request.query;

    const resetPasswordUseCase = container.resolve(ResetPasswordUserUseCase);

    const user = await resetPasswordUseCase.execute(String(token), password);

    return response.status(200).json(user);
  }
}

export { ResetPasswordUserController };