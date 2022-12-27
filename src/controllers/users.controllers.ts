import { Request, Response } from "express"
import { IUserRequest, IUserUpdate } from "../interfaces/users"
import createUserService from "../services/users/createUser"
import deleteUserService from "../services/users/deleteUser"
import listUsersService from "../services/users/listUser"
import updateUserService from "../services/users/updateUser"

export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService() 

    return res.json(users)
}

export const updateUserController = async (req: Request, res: Response) => {
    const updateData: IUserUpdate = req.body
    const userID = req.params.id

    const updatedUser = await updateUserService(updateData, userID)

    return res.json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const userID = req.params.id

    await deleteUserService(userID)

    return res.status(204).json()
}