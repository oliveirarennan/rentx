import { Category } from "../../model/Category";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  /**
   * Essa formar de receber o repositório é o equivalente a
   *  constructor(private categoriesRepository: CategoryRepository )
   */
  private categoriesRepository: ICategoryRepository;
  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
