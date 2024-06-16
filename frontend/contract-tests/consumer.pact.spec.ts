import path from 'path';
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from '@pact-foundation/pact';
import * as API from '../src/api/apiService';
import { AxiosResponse } from 'axios';
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: 'NotesFEService',
  provider: 'NotesBEService',
  logLevel: 'debug',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: '127.0.0.1',
  port: 5000,
});

describe('Pact with NotesBEService', () => {
  it('returns the users notes', async () => {
    provider.addInteraction({
      states: [{ description: 'notes are returned' }],
      uponReceiving: 'a request to get notes',
      withRequest: {
        method: 'GET',
        path: '/api/notes',
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: eachLike({
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Note Title',
          content: 'Note Content',
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
          userID: '618005a7-bbca-4d1f-83cd-1fb1d5511d06',
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.getNotes();

      expect(response.data).toStrictEqual([
        {
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Note Title',
          content: 'Note Content',
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
          userID: '618005a7-bbca-4d1f-83cd-1fb1d5511d06',
        },
      ]);
    });
  });

  it('add a note', async () => {
    provider.addInteraction({
      states: [{ description: 'note is added' }],
      uponReceiving: 'a request to create a note',
      withRequest: {
        method: 'POST',
        path: '/api/notes',
        body: {
          title: 'New Note Title',
          content: 'New Note Content',
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: like({
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'New Note Title',
          content: 'New Note Content',
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
          userID: '618005a7-bbca-4d1f-83cd-1fb1d5511d06',
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.postNote({
        title: 'New Note Title',
        content: 'New Note Content',
      });

      expect(response.data).toStrictEqual({
        id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
        title: 'New Note Title',
        content: 'New Note Content',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        userID: '618005a7-bbca-4d1f-83cd-1fb1d5511d06',
      });
    });
  });

  it('update a note', async () => {
    provider.addInteraction({
      states: [{ description: 'note is updated' }],
      uponReceiving: 'a request to update a note',
      withRequest: {
        method: 'PUT',
        path: '/api/notes/a37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
        body: {
          title: 'Updated Note Title',
          content: 'Updated Note Content',
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: like({
          id: 'a37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
          title: 'Updated Note Title',
          content: 'Updated Note Content',
          createdAt: '2024-05-21T22:58:55.743Z',
          updatedAt: '2024-05-26T19:43:58.742Z',
          userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.patchNote({
        id: 'a37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
        title: 'Updated Note Title',
        content: 'Updated Note Content',
      });

      expect((response as AxiosResponse<any>).data).toStrictEqual({
        id: 'a37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
        title: 'Updated Note Title',
        content: 'Updated Note Content',
        createdAt: '2024-05-21T22:58:55.743Z',
        updatedAt: '2024-05-26T19:43:58.742Z',
        userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      });
    });
  });
  it('update non-existant note', async () => {
    provider.addInteraction({
      states: [{ description: 'note does not exist' }],
      uponReceiving: 'a request to update a non-existant note',
      withRequest: {
        method: 'PUT',
        path: '/api/notes/b37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
        body: {
          title: 'Updated Note Title',
          content: 'Updated Note Content',
        },
      },
      willRespondWith: {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: like({ error: 'Note not found' }),
      },
    });

    await provider.executeTest(async (mockService) => {
      const response = await API.patchNote({
        id: 'b37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
        title: 'Updated Note Title',
        content: 'Updated Note Content',
      });

      expect(response.status).toBe(404);

      expect(response).toStrictEqual({
        error: 'Note not found',
        status: 404,
      });
    });
  });
  it('delete a note', async () => {
    provider.addInteraction({
      states: [{ description: 'note is deleted' }],
      uponReceiving: 'a request to delete a note',
      withRequest: {
        method: 'DELETE',
        path: '/api/notes/0a97f1c3-294e-43e8-b78f-60209e972ee9',
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: like({
          status: 'ok',
        }),
      },
    });
  });
});
