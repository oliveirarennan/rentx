import { ICategoryRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/*
! O service não precisa conhecer detalhes do repositório
*/

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exist");
    }

    this.categoriesRepository.create({ name, description });
  }
}
