import express from "express"
import { api } from "./api"
import session from "cookie-session"
import { auth } from "./auth"
import helmet from "helmet"
import compression from "compression"
import path from "path"

const app = express()
app.use(session({ secret: process.env["SESSION_SECRET"] || "my secret",}))
app.use(auth)
app.use(api)

app.get("/api/hi", (_, res) => res.send("hola"))
app.use(express.static(process.cwd()+"/dist"))
app.listen(process.env["PORT"] || 3002, () => console.log("Server started"))