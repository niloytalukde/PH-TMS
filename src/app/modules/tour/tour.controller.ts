/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { tourServices } from "./tour.services";
import { IDivision } from "./../division/division.interface";
import { ITour } from "./tour.interface";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await tourServices.createTourType(req.body);

    sendResponse(res, {
      success: true,
      message: "Tour Type Created Successfully",
      statusCode: 201,
      data: tourType,
    });
  }
);
const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await tourServices.getAllTourTypes();

    sendResponse(res, {
      success: true,
      message: "All Tour Type get  Successfully",
      statusCode: 201,
      data: tourType,
    });
  }
);

const updateTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const updateTourType = await tourServices.updateTourTypes(payload, id);

    sendResponse(res, {
      success: true,
      message: "All Tour Type get  Successfully",
      statusCode: 201,
      data: updateTourType,
    });
  }
);

const deleteTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const tourTypes = await tourServices.deleteTourTypes(id);

    sendResponse(res, {
      success: true,
      message: "Delete Tour Types  ",
      statusCode: 201,
      data: tourTypes,
    });
  }
);

// Tour services
const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await tourServices.createTour(req.body);

    sendResponse(res, {
      success: true,
      message: "Tour Type Created Successfully",
      statusCode: 201,
      data: tour,
    });
  }
);
const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload: Partial<ITour> = req.body;
    const updateTourType = await tourServices.updateTour(id, payload);

    sendResponse(res, {
      success: true,
      message: "All Tour Type get  Successfully",
      statusCode: 201,
      data: updateTourType,
    });
  }
);

const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string,string>
    const tour = await tourServices.getAllTour(query)
    sendResponse(res, {
      success: true,
      message: "Delete Tour Types  ",
      statusCode: 201,
      data: tour,
    });
  }
);

const deleteTour= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const tour = await tourServices.deleteTourTypes(id);

    sendResponse(res, {
      success: true,
      message: "Delete Tour Types  ",
      statusCode: 201,
      data: tour,
    });
  }
);

export const tourController = {
  createTourType,
  getAllTourTypes,
  updateTourTypes,
  deleteTourTypes,
  createTour,
  updateTour,
  deleteTour,getAllTour
};
