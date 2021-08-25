import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import ListAvailableCars from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import UploadCarImageController from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const uploadCarImage = multer(uploadConfig.upload("./tmp/cars"));

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvailableCars();

const createCarSpecificationController = new CreateCarSpecificationController();

const uploadCarImagesController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
