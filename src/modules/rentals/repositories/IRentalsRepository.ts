import ICreateRentalDto from "../dtos/ICreateRentalDto";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
  findById(id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDto): Promise<Rental>;
}
