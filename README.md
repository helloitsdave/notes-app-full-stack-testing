# notes-app-full-stack-testing

[![CodeQL](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml/badge.svg)](https://github.com/helloitsdave/notes-app/actions/workflows/codeql.yml)

Starting point was building FE + BE + DB with the great FreeCodeCamp tutorial [Full Stack Project Tutorial – Create A Notes App Using React and Node.js](https://www.freecodecamp.org/news/full-stack-project-tutorial-create-a-notes-app-using-react-and-node-js/)

Refactored to make more testable

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
