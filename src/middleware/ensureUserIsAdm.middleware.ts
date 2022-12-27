
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const userIsAdmMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    
    if(!req.user.isAdmin){
        throw new AppError("Adm permission is required", 403)
    }

    return next()  
}
const userIsAdmUpdateMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    
    if(!req.user.isAdmin){
        throw new AppError("Adm permission is required", 401)
    }
    
    return next()  
}

export  { userIsAdmMiddleware, userIsAdmUpdateMiddleware };