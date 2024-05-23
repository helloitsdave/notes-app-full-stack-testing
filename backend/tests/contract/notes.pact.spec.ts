import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { test, describe, vi, beforeAll } from 'vitest';
import { log } from 'console';

describe('Pact Verification', () => {
    test('verifies the pact', async () => {
        const opts = {
        customProviderHeaders: ['Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2Y4OWE3ZS1iOTQxLTRmMTctYmJlMC00ZTBjOGIyY2QyNzIiLCJpYXQiOjE3MTY0OTQ1OTYsImV4cCI6MjAzMjA3MDU5Nn0.jaUro5w3tCbQUf8jGno_tcH2-K9li0dTAksBQX-YUyk'],
        provider: 'NotesBEService', 
        providerBaseUrl: 'http://localhost:5000',
        pactUrls: [path.resolve(__dirname, '../../../frontend/pacts/NotesFEService-NotesBEService.json')], // path to your Pact file
        log: 'INFO', // Set to "DEBUG" to see output
        };

        return new Verifier(opts).verifyProvider().then(output => {
        console.log(output);
        });
    });
    }
);
