import { test, describe, expect, vi } from "vitest";
import request from "supertest";
import app from "../../src/index";
import prisma from "../../src/__mocks__/prisma";

// Mock the prisma client
vi.mock("../../src/prisma");

const seed = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discussed project timelines and goals.",
  },
  {
    id: 2,
    title: "Shopping List",
    content: "Milk, eggs, bread, and fruits.",
  },
  {
    id: 3,
    title: "Recipe",
    content: "Ingredients: Chicken, tomatoes, onions, garlic.",
  },
  {
    id: 4,
    title: "Ideas",
    content: "Brainstorming ideas for the next feature release. 🚀",
  },
  {
    id: 5,
    title: "Personal Goals",
    content: "Exercise for 30 minutes daily. Read a book every week.",
  },
  {
    id: 6,
    title: "Fête d'anniversaire",
    content: "Préparer une surprise pour la fête d'anniversaire.",
  },
  {
    id: 7,
    title: "日本旅行",
    content: "計画: 東京、京都、大阪を訪れる。",
  },
  {
    id: 8,
    title: "Семейный ужин",
    content: "Приготовить вкусный ужин для всей семьи.",
  },
  {
    id: 9,
    title: "Coding Project",
    content: "Implement new features using React and Express.",
  },
];

describe("View notes", () => {
  test("No notes returned - success", async ({}) => {
    prisma.note.findMany.mockResolvedValue([]);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
  test("Single note returned - success", async ({}) => {
    prisma.note.findMany.mockResolvedValue([seed[0]]);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        title: "Meeting Notes",
        content: "Discussed project timelines and goals.",
      },
    ]);
  });
  test("Many notes returned - success", async ({}) => {
    
    prisma.note.findMany.mockResolvedValue(seed);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(seed);
  });
  test("500 error - failure", async ({}) => {
    prisma.note.findMany.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(500);
  });
});

describe("Create a note", () => {
  test("POST with title and content", async ({}) => {
    prisma.note.create.mockResolvedValue({
      content: "Test",
      title: "Test",
      id: 1,
    });
    const response = await request(app)
      .post("/api/notes")
      .send({ content: "Test", title: "Test" });
    expect(response.status).toBe(200);
  });
  test("POST with with title - failure", async ({}) => {
    const response = await request(app)
      .post("/api/notes")
      .send({ content: "Test" });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "title and content fields required",
    });
  });
  test("POST without content - failure", async ({}) => {
    const response = await request(app)
      .post("/api/notes")
      .send({ title: "Test" });
    expect(response.status).toBe(400);
  });
  test("POST without title - failure", async ({}) => {
    const response = await request(app)
      .post("/api/notes")
      .send({ content: "Test" });
    expect(response.status).toBe(400);
  });
  test("POST with 500 error", async ({}) => {
    prisma.note.create.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app)
      .post("/api/notes")
      .send({ content: "Test", title: "Test" });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: "Oops, something went wrong",
    });
  });
});

describe("Update a note", () => {
  test("PUT update note - success", async ({}) => {
    prisma.note.update.mockResolvedValue({
      title: "Test update",
      content: "Test",
      id: 1,
    });
    const response = await request(app)
      .put("/api/notes/1")
      .send({ title: "Test update", content: "Test", id: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      title: "Test update",
      content: "Test",
      id: 1,
    });
  });
  test("PUT without title - failure", async ({}) => {
    const response = await request(app)
      .put("/api/notes/1")
      .send({ content: "Test", id: 1 });
    expect(response.status).toBe(400);
  });
  test("PUT without content - failure", async ({}) => {
    const response = await request(app)
      .put("/api/notes/1")
      .send({ title: "Test" });
    expect(response.status).toBe(400);
  });
  test("PUT without id in url - failure", async ({}) => {
    const response = await request(app)
      .put("/api/notes/")
      .send({ title: "Test" });
    expect(response.status).toBe(404);
  });
  test("PUT with not string in url - failure", async ({}) => {
    const response = await request(app)
      .put("/api/notes/blah")
      .send({ title: "Test", content: "Test", id: 1 });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "ID must be a valid number" });
  });
  test("PUT with a 500 error - failure", async ({}) => {
    prisma.note.update.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app)
      .put("/api/notes/1")
      .send({ title: "Test update", content: "Test", id: 1 });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: "Oops, something went wrong",
    });
  });
});

describe("Delete a note", () => {
  test("DELETE with id error", async ({}) => {
    const response = await request(app).delete("/api/notes/1");
    expect(prisma.note.delete).toHaveBeenCalled();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ status: "ok" });
  });
  test("DELETE without id - failure", async ({}) => {
    const response = await request(app).delete("/api/notes/");
    expect(response.status).toBe(404);
  });
  test("DELETE with id error", async ({}) => {
    prisma.note.delete.mockRejectedValue({});
    const response = await request(app).delete("/api/notes/1");
    expect(prisma.note.delete).toHaveBeenCalled();

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: "Oops, something went wrong",
    });
  });
  test("DELETE with id error", async ({}) => {
    prisma.note.delete.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app).delete("/api/notes/string");

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "ID field required" });
  });
});
