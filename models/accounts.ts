import db from "../helpers/dbconnect.ts"

// Defining schema interface
interface accountSchema {
    _id: { $oid: string }
    completeName: string
    username: string
    email: string
    password: string
    whatsapp: string

}

export default db.collection<accountSchema>("accounts")

