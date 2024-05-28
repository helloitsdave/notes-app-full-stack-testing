# notes-app-be

Postgres DB and Express Server Backend for the notes app

## Docker

Running the backend db and express server in a docker container

### Build

```bash
npm run docker:build
```

### Run

```bash
npm run docker:up
```

### Stop

```bash
npm run docker:down
```

## Test Execution

### Integration Tests

Execute the integration tests

```bash
npm run test
```

### Integration Tests with Coverage

Execute the integration tests with coverage

```bash
npm run test:coverage
```

### Service Tests

Execute the service tests against the local docker container

```bash
npm run docker:up
npm run test:service
npm run docker:down 
```

## Tag release

Tagging a release will trigger a new docker image build and upload to docker hub

```bash
git tag -a be/v1.0.3 -m "Build from action"  
git push origin be/v1.0.3
```



