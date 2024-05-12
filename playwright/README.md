# Playwright

This folder contains end-to-end tests for the application using [Playwright](https://playwright.dev/) with typescript.

##  Purpose

The goal of the tests in this folder is to validate the e2e functionality of the application by interacting with the UI like a real user.

- **Business Critical**: The tests should only cover business critical flows of the application.
- **Few Tests**: The tests should be few in number as the detailed functionality has already been covered by unit and system tests.
- **Fast Execution**: The tests should be fast to execute and should not take more than a few minutes to run.
- **Atomic**: The tests should be executable in any order and should not depend on each other to allow parallel execution
- **CI/CD**: The tests should be able to run in CI/CD pipelines

## Installation

To use the tests in this folder, you need to have Playwright installed. 

```bash
cd ./playwright
npm ci
npx playwright install
```

## Test Execution

### Running tests locally

Start the backend server:
```bash
cd ./backend
npm run docker:up
```

Start the frontend server:
```bash
cd ./frontend
npm run start
```

Executing tests against the local server:

```bash
cd ./playwright
npm run test
```

### Running tests in production

```bash
cd ./playwright
npm run test:production
```

### Headed mode

By default, tests are executed in headless mode. To run tests in headed mode, pass the `--headed` flag:

```bash
cd ./playwright
npm run test -- --headed
```

### Debug mode

To run tests in debug mode, pass the `--debug` flag:

```bash
cd ./playwright
npm run test -- --debug
```

## Page Object Model

The tests in this folder follow the Page Object Model pattern. With only a few flows in this small example application, the page object model may seem like an overkill, but it can be a good practice to follow for larger applications.

The page object file contains the selectors and methods to interact with the page or section of the application.

This makes the tests more readable and maintainable.



