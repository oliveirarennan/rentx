import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = CategoryRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
