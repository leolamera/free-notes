import { Application } from "https://deno.land/x/oak/mod.ts"
import router from "./routes.ts"

const app = new Application()

// add logger

// add timing

app.use(router.routes())
app.use(router.allowedMethods())


console.log("📖 http://localhost:2021 ✏")
await app.listen({ port: 2021 })
