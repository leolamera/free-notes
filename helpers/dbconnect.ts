import { config } from "https://deno.land/x/dotenv/mod.ts"
import { MongoClient } from "https://deno.land/x/mongo@v0.20.1/mod.ts";

const env = config()
const client = new MongoClient()
await client.connect("mongodb://localhost:2717")
console.log(`📓 the database is connected`)

export default client.database("free-notes")
