import CategoryRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create  Category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a category", async () => {
    const fakeCategory = {
      name: "Fake Category",
      description: "Fake Category description",
    };

    await createCategoryUseCase.execute(fakeCategory);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      fakeCategory.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with the same name", async () => {
    const fakeCategory = {
      name: "Fake Category",
      description: "Fake Category description",
    };

    await createCategoryUseCase.execute(fakeCategory);

    await expect(createCategoryUseCase.execute(fakeCategory)).rejects.toEqual(
      new AppError("Category already exist")
    );
  });
});
