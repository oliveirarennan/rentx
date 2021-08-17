import { Category } from "@modules/cars/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  /**
   * ! Essa Classe não está usando o tsyringe para referencias futuras
   * Essa formar de receber o repositório é o equivalente a
   *  constructor(private categoriesRepository: CategoryRepository )
   */
  private categoriesRepository: ICategoryRepository;
  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
