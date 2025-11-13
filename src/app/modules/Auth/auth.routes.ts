/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import passport from "passport";

const router =Router()

router.post("/login",AuthControllers.credentialsLogin)
router.post("/refresh-token",AuthControllers.credentialsLogin)
router.post("/logout",AuthControllers.logout)
router.post("/reset-password",AuthControllers.resetPassword)
router.get("google",async(req:Request,res:Response,next:NextFunction)=>{
    const redirect=req.query.redirect
passport.authenticate("google",{scope:["profile","email"],state:redirect as string})(req,res)
})
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),AuthControllers.googleCallback)


export  const AuthRoutes =router