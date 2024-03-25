import { test, describe, expect, vi, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/index";
import prisma from "../../src/__mocks__/prisma";
import { noteSeed } from "./mocks/notes.mock";

process.env.JWT_SECRET =
  "6aee497e203c288c08420c4db3375648390d51a873bf916e8d22d1f32e02f571e3ec57b78bd4be29a9d42cc5953df6c7902f77c560892754954d0efa74d2f154";

beforeAll(() => {
  // Mock the prisma client
  vi.mock("../../src/prisma");
});

describe("Login", () => {
  test("Valid Login returns token", async ({}) => {
    prisma.user.findFirst.mockResolvedValue({
      id: "dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
      username: "Jim",
      email: "jim@test.com",
      password: "$2y$10$bKV15yWoF6HsPvXbHvSVq.j5bJ/FItstiCt/DraA9i.LxYx2hLrbG", // pass
      updatedAt: new Date("2024-02-05T23:33:42.252Z"),
      createdAt: new Date("2024-02-05T23:43:42.252Z"),
    });
    const response = await request(app).post("/api/login").send({
      username: "Jim",
      password: "pass",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    // Expect the token when parsed to have the user id
    const token = response.body.token;
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    expect(decoded.userId).toBe("dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272");
  });
  test("Invalid password", async ({}) => {
    prisma.user.findFirst.mockResolvedValue({
      id: "dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272",
      username: "Jim",
      email: "jim@test.com",
      password: "$2y$10$bKV15yWoF6HsPvXbHvSVq.j5bJ/FItstiCt/DraA9i.LxYx2hLrbG", // pass
      updatedAt: new Date("2024-02-05T23:33:42.252Z"),
      createdAt: new Date("2024-02-05T23:43:42.252Z"),
    });
    const response = await request(app).post("/api/login").send({
      username: "Jim",
      password: "wrongpass",
    });
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: "invalid username or password",
    });
  });

  test("No username", async ({}) => {
    const response = await request(app).post("/api/login").send({
      password: "password",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "username and password fields required",
    });
  });
  test("No password", async ({}) => {
    const response = await request(app).post("/api/login").send({
      username: "checer",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "username and password fields required",
    });
  });
  test("No matching user", async ({}) => {
    prisma.user.findFirst.mockResolvedValue(null);
    const response = await request(app).post("/api/login").send({
      username: "Frank",
      password: "pass",
    });
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: "invalid username or password",
    });
  });
  test("Network error", async ({}) => {
    prisma.user.findFirst.mockImplementation(() => {
      throw new Error("Test error");
    });
    const response = await request(app).post("/api/login").send({
      username: "Frank",
      password: "pass",
    });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: "Oops, something went wrong",
    });
  });
});

describe("Authenticate Token", () => {
  test("Valid token", async ({}) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkY2Y4OWE3ZS1iOTQxLTRmMTctYmJlMC00ZTBjOGIyY2QyNzIiLCJpYXQiOjE3MTA3OTU1NDIsImV4cCI6MTc3MzkxMDc0Mn0.U17p3b4yYdOpfi2C1mh1IkDZqvPF-w_gIBsim-1ga8k";
    prisma.note.findMany.mockResolvedValue(noteSeed);
    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test("No token", async ({}) => {
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: "unauthorized" });
  });
  test("Invalid token", async ({}) => {
    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", "Bearer invalidtoken");
    expect(response.status).toBe(403);
    expect(response.body).toStrictEqual({ error: "forbidden" });
  });
});
