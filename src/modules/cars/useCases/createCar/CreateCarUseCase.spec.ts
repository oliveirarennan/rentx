import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CreateCarRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

beforeEach(() => {
  carsRepository = new CarsRepositoryInMemory();
  createCarUseCase = new CreateCarUseCase(carsRepository);
});

describe("Create Car", () => {
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fake Car",
      description: "Fake Car Description",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a existing  license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Fake Car 1",
        description: "Fake Car Description 1",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Fake Car 2",
        description: "Fake Car Description 2",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with the property available set to true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fake Car 1",
      description: "Fake Car Description 1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
