import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/*
! O service não precisa conhecer detalhes do repositório
*/

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exist");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
