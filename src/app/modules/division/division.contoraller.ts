/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { divisionServices } from "./division.services";
import {  JwtPayload } from "jsonwebtoken";

const createDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.createDivision(req.body)

    sendResponse(res, {
      success: true,
      message: "Division Created Successfully",
      statusCode: 201,
      data: division,
    });
  }
);
const getSingleDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const slug =req.params.slug
    const singleDivision = await divisionServices.getSingleDivision(slug)

    sendResponse(res, {
      success: true,
      message: "Get All Division ",
      statusCode: 201,
      data: singleDivision,
    });
  }
);
const getAllDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allDivision = await divisionServices.getAllDivision()

    sendResponse(res, {
      success: true,
      message: "Get All Division ",
      statusCode: 201,
      data: allDivision,
    });
  }
);
const updateDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id
    const payload = req.body
    const newUpdateDivision = await divisionServices.updateDivision(payload, divisionId, )

    sendResponse(res, {
      success: true,
      message: "Division Updated SuccessFully ",
      statusCode: 201,
      data:newUpdateDivision,
    });
  }
);

const deleteDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id =req.params.id
  
  const division = await divisionServices.deleteDivision(id)

    sendResponse(res, {
      success: true,
      message: "Get All Division ",
      statusCode: 201,
      data: division,
    });
  }
);


export const  divisionController={
createDivision,
getAllDivision,
updateDivision,
deleteDivision,
getSingleDivision
}
