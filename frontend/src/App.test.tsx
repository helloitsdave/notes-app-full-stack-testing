import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);

    expect(screen.getByTestId("app-logo")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    expect(localStorage.getItem("token")).toBeNull();

    expect(screen.queryByTestId("note-app")).not.toBeInTheDocument();
  });

  it("renders correctly when logged in", async () => {
    render(<App />);

    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const loginButton = screen.getByText("Login");

    userEvent.type(username, "test");
    userEvent.type(password, "pass");
    userEvent.click(loginButton);

    const noteApp = await screen.findByTestId("note-app");

    expect(noteApp).toBeInTheDocument();

    expect(localStorage.getItem("token")).not.toBeNull();
  });

  it("renders correctly when logged out", async () => {
    render(<App />);

    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const loginButton = screen.getByText("Login");

    userEvent.type(username, "test");
    userEvent.type(password, "pass");
    userEvent.click(loginButton);

    const noteApp = await screen.findByTestId("note-app");

    expect(noteApp).toBeInTheDocument();

    const logoutButton = screen.getByText("Logout");

    userEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();

    expect(screen.queryByTestId("note-app")).not.toBeInTheDocument();

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
