import { test, describe, expect, vi } from "vitest";
import request from "supertest";
import app from "../../src/index";
import prisma from "../../src/__mocks__/prisma";
import { noteSeed } from "./mocks/notes.mock";
import { userSeed } from "./mocks/users.mock"

// Mock the prisma client
vi.mock("../../src/prisma");

describe("View notes", () => {
  test("No notes returned - success", async ({}) => {
    prisma.note.findMany.mockResolvedValue([]);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
  test("Single note returned - success", async ({}) => {
    prisma.note.findMany.mockResolvedValue([noteSeed[0]]);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        title: "Meeting Notes",
        content: "Discussed project timelines and goals.",
        createdAt: "2024-02-05T23:43:42.252Z",
        updatedAt: "2024-02-05T23:33:42.252Z",
        userID: "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
      },
    ]);
  });
  test("Many notes returned - success", async ({}) => {
    prisma.note.findMany.mockResolvedValue(noteSeed);
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);

    const expectedResult = noteSeed.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
      userID: "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
    }));

    expect(response.body).toEqual(expectedResult);
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
      updatedAt: new Date("2024-02-05T23:33:42.252Z"),
      createdAt: new Date("2024-02-05T23:33:42.252Z"),
      userID: "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
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
      updatedAt: new Date("2024-02-05T23:33:42.252Z"),
      createdAt: new Date("2024-02-05T23:33:42.252Z"),
      userID: "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
    });
    const response = await request(app)
      .put("/api/notes/1")
      .send({ title: "Test update", content: "Test", id: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      title: "Test update",
      content: "Test",
      createdAt: "2024-02-05T23:33:42.252Z",
      id: 1,
      updatedAt: "2024-02-05T23:33:42.252Z",
      userID: "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
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

describe("Health check", () => {
  test("GET /health", async ({}) => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ status: "ok" });
  });
});

describe("Get Users", () => {
  test("No Users returned", async ({}) => {
    prisma.user.findMany.mockResolvedValue([]);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Should get many users returned", async () => {
    prisma.user.findMany.mockResolvedValue(userSeed);

    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);

    const expectedResult = userSeed.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
    }));

    expect(response.body[0]).not.toHaveProperty('password')

    expect(response.body).toEqual(expectedResult);
  });

  test("Network Error", async ({}) => {
    prisma.user.findMany.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: "Oops, something went wrong"});
  });
});

describe("Create User", () => {
  test("POST with email, username and password", async ({}) => {
    prisma.user.create.mockResolvedValue({
      id: "gcf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
      email: 'test@email.com',
      username: 'Dave',
      password: 'check',
      updatedAt: new Date("2024-02-05T23:33:42.252Z"),
      createdAt: new Date("2024-02-05T23:33:42.252Z"),
    });
    const response = await request(app)
      .post("/api/users")
      .send({ email: "email", username: "Dave", password: 'check' });
    expect(response.status).toBe(200);
  });

  test("POST without email", async ({}) => {
    const response = await request(app)
      .post("/api/users")
      .send({ username: "Dave", password: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "email, password, and username fields required",
    });
  });

  test("POST without username", async ({}) => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "Dave@hotmail.com", password: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "email, password, and username fields required",
    });
  });

  test("POST without password", async ({}) => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "Dave@hotmail.com", username: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "email, password, and username fields required",
    });
  });

  test("POST with error", async ({}) => {
    prisma.user.create.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app)
      .post("/api/users")
      .send({ email: "email", username: "Dave", password: 'check' });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: "Oops, something went wrong"});
  });
});
