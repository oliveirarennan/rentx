import ICreateCarDto from "@modules/cars/dtos/ICreateCarDto";

import Car from "../infra/typeorm/entities/Car";

export default interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
