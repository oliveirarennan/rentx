import { Category } from "../model/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class PostgresCategoriesRepository implements ICategoryRepository {
  findByName(name: string): Category | null {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }
}
