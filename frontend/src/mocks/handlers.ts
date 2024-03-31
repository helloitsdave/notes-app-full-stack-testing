import { http, HttpResponse } from "msw";
import { db } from "./db";


const BASE_URL = "http://localhost:5000/api";

db.note.create({ id: 1, title: "Test Title Note 1", content: "Test Content 1" });
db.note.create({ id: 2, title: "Test Title Note 2", content: "Test Content 2" });
db.user.create({ id: 1, username: "test", password: "pass" });

type Note = {
    id: number;
    title: string;
    content: string;
    };

type LoginRequestBody = {
    username: string;
    password: string;
  };

const handlers = [
    http.post(`${BASE_URL}/login`, async ({ request }) => {
        const { username, password } = await request.json() as LoginRequestBody;
        const user = db.user.findFirst({
            where: {
                username: { equals: username },
                password: { equals: password },
            },
        });
        if (user) {
            return HttpResponse.json({ token: "test" });
        } else {
            return HttpResponse.error();
        }
    }),

    http.get(`${BASE_URL}/notes`, () => {
        return HttpResponse.json(db.note.getAll());
    }),
    http.post(`${BASE_URL}/notes`, async ({ request }) => {
        // Read the intercepted request body as JSON.
        const newPost = await request.json()

        db.note.create({...newPost as Note, id: db.note.count() + 1});

        return HttpResponse.json(newPost, { status: 201 })
    }),
    http.put(`${BASE_URL}/notes/:id`, async ({ request }) => {
        const url = new URL(request.url)
        // Get the id from the URL path
        const match = url.pathname.match(/\/api\/notes\/(\d+)/);
        const id = match ? match[1] : null;
        const updatedNote = await request.json();
        db.note.update({ where: {
            id: { equals: Number(id) }}, 
            data: updatedNote as Note
        });
        return HttpResponse.json(updatedNote);
    }),
    http.delete(`${BASE_URL}/notes/:id`, async ({ request }) => {
        const url = new URL(request.url)
        // Get the id from the URL path
        const match = url.pathname.match(/\/api\/notes\/(\d+)/);
        const id = match ? match[1] : null;
        db.note.delete({ where: {
            id: { equals: Number(id) }}
        });
        return HttpResponse.json({ status: "ok" });
    }
    ),
];

const errorHandlers = [
  http.get(`${BASE_URL}/notes`, () => {
    return HttpResponse.error();
  }),
  http.post(`${BASE_URL}/notes`, () => {
    return HttpResponse.error();
  }),
  http.put(`${BASE_URL}/notes/:id`, () => {
    return HttpResponse.error();
  }),
  http.delete(`${BASE_URL}/notes/:id`, () => {
    return HttpResponse.error();
  }),
];

export { handlers, errorHandlers };
