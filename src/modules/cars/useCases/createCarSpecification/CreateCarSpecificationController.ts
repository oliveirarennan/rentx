import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCarSpecificationsUseCase from "./CreateCarSpecificationUseCase";

export default class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(cars);
  }
}
