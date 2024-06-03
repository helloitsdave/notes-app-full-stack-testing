# notes-app-be

Postgres DB and Express Server Backend for the notes app

## Docker

Running the backend db and express server in a docker container

### Build

```bash
yarn docker:build
```

### Run

```bash
yarn docker:up
```

### Stop

```bash
yarn docker:down
```

## Test Execution

### Integration Tests

Execute the integration tests

```bash
yarn test
```

### Integration Tests with Coverage

Execute the integration tests with coverage

```bash
yarn test:coverage
```

### e2e Tests

Execute the service tests against the local docker container

```bash
yarn docker:up
yarn test:e2e
yarn docker:down 
```

### Contract Tests

Execute the service tests against the local docker container

```bash
yarn docker:up
yarn test:contract
yarn docker:down 
```

## Tag release

Tagging a release will trigger a new docker image build and upload to docker hub

```bash
git tag -a be/v1.0.3 -m "Build from action"  
git push origin be/v1.0.3
```



