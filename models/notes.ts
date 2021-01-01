import db from "../helpers/dbconnect.ts"

interface notesSchema {
    _id: { $oid: string }
    notesName: string
    notesBody: string
    timestamp: string
    notesTag: Array<string>
    isSecret: boolean
}

export default db.collection<notesSchema>("notes")
