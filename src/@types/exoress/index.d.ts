import * as express from "empress";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number,
                isAdmin: boolean,
                isActive: boolean
            }

        }
    }
}