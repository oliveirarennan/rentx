import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export default (): ListCategoriesController => {
  const categoryRepository = new CategoryRepository();

  const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoryUseCase
  );

  return listCategoriesController;
};
