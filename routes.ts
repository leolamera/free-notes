import { Router } from "https://deno.land/x/oak/mod.ts"
import accountControllers from "./controllers/accounts.ts"

const router = new Router()

router
    .post("/accounts", accountControllers.insertUser)
    .post("/login", accountControllers.consultUser)
    .delete("/accounts", accountControllers.deleteUser)
    .get("/accounts", accountControllers.getUser)

export default router