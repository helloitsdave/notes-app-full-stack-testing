# notes-app-full-stack-testing

[![CodeQL](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml/badge.svg)](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml)

My intention is to build and deploy a very simple app (FE/BE + DB) which can be used to demonstrate tests for each layer using vitest, react-testing-library and playwright.

Starting point for building the app is the nice FreeCodeCamp tutorial [Full Stack Project Tutorial – Create A Notes App Using React and Node.js](https://www.freecodecamp.org/news/full-stack-project-tutorial-create-a-notes-app-using-react-and-node-js/)

Refactored the app for testibility and added a few additional tweaks. 

## Frontend

### FE Implementation

- React
- Typescript
- [Axios](https://axios-http.com/docs/intro)

### End to End Tests (e2e)

- [Playwright.io](https://playwright.dev/) with typescript

### Component Tests

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with [vitest](https://vitest.dev/)
- [Mock Service Worker(msw)](https://mswjs.io/) to mock the api
- [msw/data](https://github.com/mswjs/data) for data store

## Backend

### BE Implementation

- Node.js
- Typescript
- Express
- [Primsa](https://www.prisma.io/) (DB ORM)

### Tests (Pending)

## Database

- [Postgres](https://www.postgresql.org/) with Serverless hosting on [Neon](https://neon.tech/)
