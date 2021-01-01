import { Router } from "https://deno.land/x/oak/mod.ts"
import accountControllers from "./controllers/accounts.ts"
import notesControllers from "./controllers/notes.ts"

const router = new Router()

router
    .post("/accounts", accountControllers.insertUser)
    .post("/login", accountControllers.consultUser)
    .delete("/accounts", accountControllers.deleteUser)
    .get("/accounts", accountControllers.getUser)
    .post("/notes", notesControllers.insertNotes)
    .get("/notes", notesControllers.getNotesByAuthor)
    .get("/notes/:id", notesControllers.getNoteById)
    .put("/notes/:id", notesControllers.updateNoteById)
    .delete("/notes/:id", notesControllers.deleteNoteById)



export default router