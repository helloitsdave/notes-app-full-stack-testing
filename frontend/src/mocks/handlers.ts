import { http, HttpResponse } from 'msw';

const handlers = [
    http.post("http://localhost:5001/api/notes", () => {
        return HttpResponse.json({ id: 1, title: "Test Title", content: "Test Content" });
    })
]

export default handlers