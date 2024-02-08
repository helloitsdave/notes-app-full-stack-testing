import prisma from "./prisma";
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { updatedAt: "desc" }});
    res.json(notes);
  }
  catch (error) {
    res.status(500).send({"error": "Oops, something went wrong"});
}
  });

app.post("/api/notes", async (req, res) => {
const { title, content } = req.body;

if (!title || !content) {
    return res.status(400).send({ "error": "title and content fields required"});
}

try {
    const note = await prisma.note.create({
    data: { title, content },
    });
    res.json(note);
} catch (error) {
    res.status(500).send({"error": "Oops, something went wrong"});
}
});

app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
  
    if (!title || !content) {
      return res.status(400).send({"error": "title and content fields required"});
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send({ "error": "ID must be a valid number"});
    }
  
    try {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: { title, content, updatedAt: new Date()},
      });
      res.json(updatedNote);
    } catch (error) {
      res.status(500).send({ "error": "Oops, something went wrong"});
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
  
    if (!id || isNaN(id)) {
      return res.status(400).send({"error": "ID field required"});
    }
  
    try {
      await prisma.note.delete({
        where: { id },
      });
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).send({ "error": "Oops, something went wrong"});
    }
  });

app.listen(PORT, () => {
    console.log("server running on localhost", PORT);
  });

  export default app;