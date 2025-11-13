
import AppError from "../../errorHelpers/appError";
import { excludeField, tourSearchableFields } from "./tour.constance";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

//Tour Type services
const createTourType = async (payload: ITourType) => {
  const isExistTourType = await TourType.findById({ name: payload.name });

  if (isExistTourType) {
    throw new AppError(400, "Tour Type already Exist ");
  }

  const tourType = await TourType.create(payload);
  return tourType;
};

const getAllTourTypes = async () => {
  const tourType = await TourType.find({});
  return tourType;
};

const updateTourTypes = async (payload: ITourType, id: string) => {
  const existTourType = await TourType.findById(id);

  if (!existTourType) {
    throw new AppError(400, "Division are nor exist ");
  }
  const duplicateDivision = await TourType.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(400, "Division are nor exist ");
  }

  const newUpdatedTourType = await TourType.findOneAndUpdate(
    { _id: id },
    payload
  );

  return newUpdatedTourType;
};
const deleteTourTypes = async (id: string) => {
  await TourType.findByIdAndDelete(id);
  return null;
};

// Tour Services

const createTour = async (payload: ITour) => {
  const isExistTour = await Tour.findOne({ name: payload.title });
  if (isExistTour) {
    throw new AppError(400, "This tour are already exist ");
  }

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTour =async (query :Record<string,string>)=>{
const filter = query
const searchTerm =query.searchTerm || ""
const sort = query.sort || "-createdAt"
const fields =query?.fields.split(",").join("") || ""

const page =Number(query.page) || 1
const limit = Number(query.limit) || 10
const skip =(page-1)*limit


for(const field in excludeField){
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete filter[field]
}

const searchQuery = {
  $or:tourSearchableFields.map(field =>({[field]:{$regex:searchTerm,$options:"i"}}))
}
const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
const totalTours = await Tour.countDocuments();
const totalPage = Math.ceil(totalTours/limit)

const meta  = {
  page:page,
  total :totalTours,
  limit:limit,
  totalPage:totalPage
  
}

return {
  data:tours,
  meta: meta
}

}



const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }

    // if (payload.title) {
    //     const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    //     let slug = `${baseSlug}`

    //     let counter = 0;
    //     while (await Tour.exists({ slug })) {
    //         slug = `${slug}-${counter++}` // dhaka-division-2
    //     }

    //     payload.slug = slug
    // }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};


export const tourServices = {
  createTourType,
  getAllTourTypes,
  updateTourTypes,
  deleteTourTypes,
  createTour,
  updateTour,
  deleteTour,
  getAllTour
};
