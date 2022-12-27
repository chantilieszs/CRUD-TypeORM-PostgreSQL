import "reflect-metadata"
import express from "express"
import { errorHandler } from "./errors/HandleError"
import "express-async-errors"
import userRouter from "./routes/userRoutes"
import loginRouter from "./routes/loginRoute"

const app = express()
app.use(express.json())

app.use("/users", userRouter)

app.use("/login", loginRouter)

app.use(errorHandler)


export default app