import { container } from "tsyringe";

import UsersRepository from "../../modules/accounts/repositories/implementations/UsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
/**
 * * Informamos a interface
 * * Escolhemos um nome para o container
 * * Informamos a Classe que implementa a interface
 */
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
