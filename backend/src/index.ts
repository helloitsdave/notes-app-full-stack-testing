import prisma from "./prisma";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import authenticateToken from "./authenticateToken";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

declare global {
  namespace Express {
    interface Request {
      user: { userId: string };
    }
  }
}

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password fields required" });
  }

  try {
    const user = await prisma.user.findFirst({ where: { username, password } });

    if (!user) {
      return res.status(401).send({ error: "invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send({ error: "Oops, something went wrong" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/notes", authenticateToken, async (req, res) => {
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

app.post("/api/notes", authenticateToken, async (req, res) => {
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

app.put("/api/notes/:id", authenticateToken, async (req, res) => {
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

app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
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

app.get("/api/users", authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const usersWithPasswordsRemoved = users.map((user) => {
      delete user.password;
      return user;
    });
    res.json(usersWithPasswordsRemoved);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: "Oops, something went wrong" });
  }
});

app.post("/api/users", authenticateToken, async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .send({ error: "email, password, and username fields required" });
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  try {
    if (existingUser) {
      return res.status(400).send({ error: "Username or email already exists" });
    }

    const user = await prisma.user.create({
      data: { email, password, username },
    });
    const userWithoutPassword = { ...user, password: undefined };
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).send({ error: "Oops, something went wrong" });
  }
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("server running on localhost", PORT);
  });
}

export default app;
