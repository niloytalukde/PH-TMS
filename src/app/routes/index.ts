import { Router } from "express"
import { userRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/Auth/auth.routes"
import { divisionRoutes } from './../modules/division/division.route';
import { tourRoutes } from "../modules/tour/tour.route";

export const indexRouter =Router()

const moduleRoutes=[
    {
        path:"/user",
        route:userRoutes
    },
    {
        path:"/auth",
        route:AuthRoutes
    },
    {
        path:"/division",
        route:divisionRoutes
    },
    {
        path:"/tour",
        route:tourRoutes
    },
]

moduleRoutes.forEach((route)=>{
indexRouter.use(route.path,route.route)
})