import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { test, describe } from 'vitest';

const token = process.env.CONTRACT_TEST_AUTH_TOKEN;

describe('Pact Verification', () => {
  test('verifies the pact', async () => {
    const opts = {
      customProviderHeaders: [`Authorization: Bearer ${token}`],
      provider: 'NotesBEService',
      providerBaseUrl: 'http://localhost:5000',
      pactUrls: [
        path.resolve(
          __dirname,
          '../../../frontend/pacts/NotesFEService-NotesBEService.json'
        ),
      ],
      log: 'INFO', // Set to "DEBUG" to see output
    };
    return new Verifier(opts).verifyProvider().then((output) => {
      console.log(output);
    });
  });
});
