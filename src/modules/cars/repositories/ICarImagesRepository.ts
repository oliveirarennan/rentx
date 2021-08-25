import CarImage from "../infra/typeorm/entities/CarImage";

export default interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
