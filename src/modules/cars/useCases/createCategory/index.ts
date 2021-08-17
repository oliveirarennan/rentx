import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

/**
 * ! Vou deixar a injeção de dependências manual nesse caso de uso
 * ! Para referências futuras
 */

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoryRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
