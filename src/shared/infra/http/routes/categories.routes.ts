import { Request, Response, Router } from "express";
import multer from "multer";

import createCategoryController from "@modules/cars/useCases/createCategory";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import listCategoriesController from "@modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
