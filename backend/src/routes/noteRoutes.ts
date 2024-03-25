import express from 'express';
import prisma from "../prisma";
import authenticateToken from "../authenticateToken";

const router = express.Router();

router.get("/api/notes", authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    try {
      const notes = await prisma.note.findMany({
        where: { userID: userId },
        orderBy: { updatedAt: "desc" },
      });
      res.json(notes);
    } catch (error) {
      res.status(500).send({ error: "Oops, something went wrong" });
    }
  });
  
  router.post("/api/notes", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const userID = req.user.userId;
  
    if (!title || !content) {
      return res.status(400).send({ error: "title and content fields required" });
    }
  
    try {
      const note = await prisma.note.create({
        data: { title, content, userID },
      });
      res.json(note);
    } catch (error) {
      res.status(500).send({ error: "Oops, something went wrong" });
    }
  });
  
  router.put("/api/notes/:id", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
  
    if (!title || !content) {
      return res.status(400).send({ error: "title and content fields required" });
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send({ error: "ID must be a valid number" });
    }
  
    try {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: { title, content, updatedAt: new Date() },
      });
      res.json(updatedNote);
    } catch (error) {
      res.status(500).send({ error: "Oops, something went wrong" });
    }
  });
  
  router.delete("/api/notes/:id", authenticateToken, async (req, res) => {
    const id = parseInt(req.params.id);
  
    if (!id || isNaN(id)) {
      return res.status(400).send({ error: "ID field required" });
    }
  
    try {
      await prisma.note.delete({
        where: { id },
      });
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).send({ error: "Oops, something went wrong" });
    }
  });

export default router;