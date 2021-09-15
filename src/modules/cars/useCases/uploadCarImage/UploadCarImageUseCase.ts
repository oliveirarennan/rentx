import { inject, injectable } from "tsyringe";

import ICarImagesRepository from "@modules/cars/repositories/ICarImagesRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export default class UploadCarImageUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storeProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
      await this.storeProvider.save(image, "cars");
    });
  }
}
