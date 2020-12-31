import accounts from "../models/accounts.ts"
import { hashSync, compareSync } from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const insertUser = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const password = value.password
        const hashPassword = hashSync(password)
        value.password = hashPassword
        // add new user loggin
        await accounts.insertOne(value)
        context.response.body = {
            "action": "post",
            "collection": "accounts",
            "values": value,
            "success": true
        }
    } else {
        context.response.body = {
            "action": "post",
            "collection": "accounts",
            "values": {},
            "success": false
        }
    }
}

export default {
    insertUser: insertUser
}