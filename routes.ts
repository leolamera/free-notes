import { Router } from "https://deno.land/x/oak/mod.ts"
import accountControllers from "./controllers/accounts.ts"

const router = new Router()

router
    .post("/accounts", accountControllers.insertUser)

export default router