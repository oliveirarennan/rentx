import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

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
