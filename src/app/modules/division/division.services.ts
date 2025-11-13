import AppError from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const isExistDivision = await Division.findOne({ name: payload.name });
  if (isExistDivision) {
    throw new AppError(400, "Division Already Exist");
  }

  

  const division = await Division.create(payload);

  return division;
};

const getAllDivision = async () => {
  const division = await Division.find({});
  return division;
};
const getSingleDivision = async (slug:string) => {
  const division = await Division.findOne({slug});
  return division;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

const updateDivision = async (payload: IDivision, divisionId: string) => {
  const existDivision = await Division.findById(divisionId);

  if (!existDivision) {
    throw new AppError(400, "Division are nor exist ");
  }
  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });

  if (duplicateDivision) {
    throw new AppError(400, "Division are nor exist ");
  }

  const newUpdateDivision = await Division.findByIdAndUpdate(
    divisionId,
    payload,
    { new: true, runValidators: true }
  );
  return newUpdateDivision;
};

export const divisionServices = {
  createDivision,
  updateDivision,
  getAllDivision,
  deleteDivision,
  getSingleDivision
};
