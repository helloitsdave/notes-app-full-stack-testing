# notes-app-full-stack-testing
[![CodeQL](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml/badge.svg)](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml)

The intention is to build and deploy a very simple app (FE/BE + DB) which can be used to demonstrate tests for each layer using vitest, supertest, react-testing-library and playwright.

Starting point for building the app was the great FreeCodeCamp tutorial [Full Stack Project Tutorial – Create A Notes App Using React and Node.js](https://www.freecodecamp.org/news/full-stack-project-tutorial-create-a-notes-app-using-react-and-node-js/)

Refactored the app for testability and added a few additional tweaks.

## Deployed app
[![Playwright e2e Production Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/playwright-production-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/playwright-production-tests.yml)

- FE and BE services are deployed using the free tier on [render.com](https://render.com/)
- Database is deployed using serverless postgres on [neon](https://neon.tech/)

[https://notes-app-full-stack-bjml.onrender.com/](https://notes-app-full-stack-bjml.onrender.com/)

## FE Implementation

- React
- Typescript
- [Axios](https://axios-http.com/docs/intro)

## BE Implementation

- Node.js
- Typescript
- Express
- Postgres
- [Primsa](https://www.prisma.io/) (DB ORM)

### Database

- [Postgres](https://www.postgresql.org/) with Serverless hosting on [Neon](https://neon.tech/)

## Test Layers

### FE End to End Tests (e2e)
[![Playwright e2e Production Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/playwright-production-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/playwright-production-tests.yml)

- [Playwright.io](https://playwright.dev/) with typescript
- [Allure Production Test Report](https://helloitsdave.github.io/notes-app-full-stack-testing) with history

### FE Component Tests
[![Frontend Component Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/frontend-component-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/frontend-component-tests.yml)

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with [vitest](https://vitest.dev/)
- [Mock Service Worker(msw)](https://mswjs.io/) to mock the api
- [msw/data](https://github.com/mswjs/data) for data store

### FE Service Tests
[![Frontend Service Tests - Playwright](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/frontend-service-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/frontend-service-tests.yml)

- docker and [Playwright.io](https://playwright.dev/)

### BE e2e Tests
[![Backend e2e Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-e2e-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-e2e-tests.yml)
- docker, [supertest](https://github.com/ladjs/supertest) and [vitest](https://vitest.dev/)

### BE Integration Tests
[![Backend Integration Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-integration-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-integration-tests.yml)
- [supertest](https://github.com/ladjs/supertest), [vitest](https://vitest.dev/) and [vitest-mock-extended](https://github.com/eratio08/vitest-mock-extended)

### API Contract Tests
[![Backend Contract Tests](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-contract-tests.yml/badge.svg)](https://github.com/helloitsdave/notes-app-full-stack-testing/actions/workflows/backend-contract-tests.yml)

- Contract tests with [pact](https://docs.pact.io/)
