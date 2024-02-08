import { config } from "dotenv";
import { test, expect } from "vitest";
import request from "supertest";

config();

const URL = `${process.env.API_URL}/api/notes`;

let getNoteResponse: any;
let createdID: number;

test("Get the list of Notes", async () => {
  getNoteResponse = await request(URL).get("/");
  expect(getNoteResponse.status).toBe(200);
  expect(getNoteResponse.body).toHaveLength(9);

  expect(getNoteResponse.body[getNoteResponse.body.length - 1]).toStrictEqual({
    content: "Discussed project timelines and goals.",
    createdAt: "2024-02-05T23:33:42.252Z",
    id: 1,
    title: "Meeting Notes",
    updatedAt: "2024-02-05T23:33:42.252Z",
  });
});

test("Create a new Note", async () => {
  const res = await request(URL).post("/").send({
    title: "This is a test note title with special characters: !@#$%^&*()",
    content: "This is a test note content with special characters: !@#$%^&*()",
  });
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(
    "This is a test note title with special characters: !@#$%^&*()"
  );
  expect(res.body.content).toBe(
    "This is a test note content with special characters: !@#$%^&*()"
  );

  createdID = res.body.id;

  getNoteResponse = await request(URL).get("/");
  expect(getNoteResponse.status).toBe(200);
  expect(getNoteResponse.body).toHaveLength(10);
});

test("Update a Note", async () => {
  const updateRes = await request(URL).put(`/${createdID}`).send({
    title: "This is an updated test note title",
    content: "This is an updated test note content",
  });
  expect(updateRes.status).toBe(200);
  expect(updateRes.body.title).toBe("This is an updated test note title");
  expect(updateRes.body.content).toBe("This is an updated test note content");

  getNoteResponse = await request(URL).get("/");
  expect(getNoteResponse.status).toBe(200);
  expect(getNoteResponse.body).toHaveLength(10);

  // Updated note should appear first in the list
  expect(getNoteResponse.body[0].id).toBe(createdID);
});

test("Delete a Note", async () => {
  const deleteRes = await request(URL).delete(`/${createdID}`);
  expect(deleteRes.status).toBe(200);

  getNoteResponse = await request(URL).get("/");
  expect(getNoteResponse.status).toBe(200);
  expect(getNoteResponse.body).toHaveLength(9);
});

test("Error handling: Attempt to Delete a Note with invalid ID", async () => {
  const deleteRes = await request(URL).delete(`/invalid-id`);
  expect(deleteRes.status).toBe(400);
  expect(deleteRes.body.error).toBe("ID field required");
});
