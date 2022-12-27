import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginService from "../services/login";

const loginController = async (req: Request, resp: Response) => {
    const loginData: IUserLogin = req.body
    const token = await loginService(loginData)

    return resp.json({token})
}

export default loginController;