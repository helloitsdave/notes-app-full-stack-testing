import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { LoginProps } from "./Login";

const props: LoginProps = { onLogin: () => {} };

describe("Login", () => {
  test("Should see the login form", () => {
     render(<Login {...props} />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  test("Should not see token on failed login", async () => {
    render(<Login {...props}/>);
    userEvent.type(screen.getByPlaceholderText("Username"), "wronguser");
    userEvent.type(screen.getByPlaceholderText("Password"), "wrongpassword");
    userEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe(null);
    });
  }
  );
  test("Should save token to local store on successful logina", async () => {
    render(<Login {...props}/>);
    userEvent.type(screen.getByPlaceholderText("Username"), "test");
    userEvent.type(screen.getByPlaceholderText("Password"), "pass");
    userEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test");
    });
  });
  test('Should show error message on failed login', async () => {
    render(<Login {...props}/>);
    userEvent.type(screen.getByPlaceholderText("Username"), "wronguser");
    userEvent.type(screen.getByPlaceholderText("Password"), "wrongpassword");
    userEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please retry")).toBeInTheDocument();
    });
  });
});