import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import SpecificationRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarSpecificationsUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
  createCarSpecificationUseCase = new CreateCarSpecificationsUseCase(
    carsRepositoryInMemory,
    specificationRepositoryInMemory
  );
});

describe("Create Car Specification", () => {
  it("should be able to add a new specification to a non existing  car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fake Car",
      description: "Fake Car Description",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "Fake Specification 1",
      description: "Fake description 1",
    });

    const car_id = car.id;
    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });
});
