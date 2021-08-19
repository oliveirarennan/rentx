import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 110,
      license_plate: "DEF-12123",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 110,
      license_plate: "DEF-12123",
      fine_amount: 40,
      brand: "Car_Brand_Test",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand_Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 110,
      license_plate: "DEF-12125",
      fine_amount: 40,
      brand: "Car_Brand_Test",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 110,
      license_plate: "DEF-12125",
      fine_amount: 40,
      brand: "Car_Brand_Test",
      category_id: "12345",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars).toEqual([car]);
  });
});
