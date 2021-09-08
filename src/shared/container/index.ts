import { container } from "tsyringe";

import "@shared/container/providers";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import CarImagesRepository from "@modules/cars/infra/typeorm/repositories/CarImageRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarImagesRepository from "@modules/cars/repositories/ICarImagesRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
