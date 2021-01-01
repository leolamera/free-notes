import accounts from "../models/accounts.ts"
import { hashSync, compareSync } from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const consultUser = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const email = value.email
        const password = value.password
        const queryByEmail = await accounts.findOne({"email": email})

        if (!!queryByEmail) {
            const dbPassword = queryByEmail.password
            const result = compareSync(password, dbPassword)
            if (result) {
                context.response.body = {"loginWith":"email"}
            } else {
                context.response.body = {"error":"wrong password"}
            }
        } else {
            context.response.body = {"error":"this email is not avalible"}
        }
             
    }
}

const deleteUser = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const email = value.email
        const deleteCount = await accounts.deleteOne({ email: email })
        console.log(deleteCount)
    }

}

const getUser = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const email = value.email
        const queryByEmail = await accounts.findOne({"email": email})
        console.log(queryByEmail)
        context.response.body = queryByEmail
    }
}

const insertUser = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const email = value.email
        const response = await accounts.findOne({"email": email})
        if (!!response) {
            context.response.body = {"error": "this email already exist"}
        } else {
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
    insertUser: insertUser,
    consultUser: consultUser,
    deleteUser: deleteUser,
    getUser: getUser
}