import path from "path";
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from "@pact-foundation/pact";
import * as API from "../api/apiService";
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: "NotesFEService",
  provider: "NotesBEService",
  logLevel: "debug",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: "127.0.0.1",
  port: 5000,
});

describe("Pact with NotesBEService", () => {
  it("returns the users notes", async () => {
    provider.addInteraction({
      states: [{ description: "notes are returned" }],
      uponReceiving: "a request to get notes",
      withRequest: {
        method: "GET",
        path: "/api/notes",
      },
      willRespondWith: {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: eachLike({
          id: 1,
          title: "Note Title",
          content: "Note Content",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
          userID: "618005a7-bbca-4d1f-83cd-1fb1d5511d06",
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.getNotes();

      expect(response.data).toStrictEqual([
        {
          id: 1,
          title: "Note Title",
          content: "Note Content",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
          userID: "618005a7-bbca-4d1f-83cd-1fb1d5511d06",
        },
      ]);
    });
  });
  it("add a note", async () => {
    provider.addInteraction({
      states: [{ description: "note is added" }],
      uponReceiving: "a request to create a note",
      withRequest: {
        method: "POST",
        path: "/api/notes",
        body: {
          title: "New Note Title",
          content: "New Note Content",
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: like ({
          id: 1,
          title: "New Note Title",
          content: "New Note Content",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
          userID: "618005a7-bbca-4d1f-83cd-1fb1d5511d06",
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.postNote({
        title: "New Note Title",
        content: "New Note Content",
        });

      expect(response.data).toStrictEqual(
        {
          id: 1,
          title: "New Note Title",
          content: "New Note Content",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
          userID: "618005a7-bbca-4d1f-83cd-1fb1d5511d06",
        },
      );
    });
  });
});
