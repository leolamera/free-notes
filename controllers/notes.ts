import notes from "../models/notes.ts"
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts"


const insertNotes = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        // add new note logging
        await notes.insertOne(value)
        context.response.body = {
            "action": "post",
            "collection": "notes",
            "values": value,
            "success": true
        }
    } else {
        context.response.body = {
            "action": "post",
            "collection": "notes",
            "values": {},
            "success": false
        }
    }
}

const getNotesByAuthor = async (context: any) => {
    if (context.request.hasBody) {
        const requestObject = context.request.body({type: "json"})
        const value = await requestObject.value
        const authorId = value.authorId
        console.log(authorId)
        const query = {"author": authorId}
        const cursorNotes = await notes.find(query)
        const arrayNotes = await cursorNotes.toArray()
        context.response.body = {
            "action": "get",
            "collection": "notes",
            "values": arrayNotes,
            "success": true
        }

    } else {
        context.response.body = {
            "action": "get",
            "collection": "notes",
            "values": {},
            "success": false
        }
    }
}

const getNoteById = async (context: any) => {
    if (context.params && context.params.id) {
        const noteId = context.params.id 
        const noteObject = await notes.findOne({_id: new Bson.ObjectId(noteId)})
        context.response.body = {
            "action": "get one",
            "collection": "notes",
            "values": noteObject,
            "success": true
        }
    } else {
        context.response.body = {
            "action": "params id",
            "collection": "notes",
            "values": {},
            "success": false
        }
    }
}

const deleteNoteById = async (context: any) => {
    if (context.params && context.params.id) {
        const noteId = context.params.id 
        const noteObject = await notes.deleteOne({_id: new Bson.ObjectId(noteId)})
        context.response.body = {
            "action": "delete",
            "collection": "notes",
            "values": noteObject,
            "success": true
        }
    } else {
        context.response.body = {
            "action": "params id",
            "collection": "notes",
            "values": {},
            "success": false
        }
    }
}

const updateNoteById = async (context: any) => {
    if (context.params && context.params.id && context.request.hasBody) {
        const noteId = new Bson.ObjectId(context.params.id)
        const requestObject = context.request.body({type: "json"})
        const newValues = await requestObject.value 
        const resultReview = await notes.updateOne({_id: noteId}, {$set: newValues})

        context.response.body = {
            "action": "delete",
            "collection": "notes",
            "values": resultReview,
            "success": true
        }
    } else {
        context.response.body = {
            "action": "params id",
            "collection": "notes",
            "values": {},
            "success": false
        }
    }
}

export default {
    insertNotes: insertNotes,
    getNotesByAuthor: getNotesByAuthor,
    getNoteById: getNoteById,
    updateNoteById: updateNoteById,
    deleteNoteById: deleteNoteById
}