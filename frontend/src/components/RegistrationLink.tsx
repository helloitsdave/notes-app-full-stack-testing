/* eslint-disable prettier/prettier */
const RegistrationLink = (props: { onRegister: boolean }) => {
  return (
    <div className="registration-container">
      {!props.onRegister ? (
        <div className="registration-link-container">
          <div className="github-info-container">
            <p>
              This is a simple app to demonstrate different automated testing
              techniques. 
            </p>
            <p>
            View the source code on GitHub.
            </p>
            <a
              href="https://github.com/helloitsdave/notes-app-full-stack-testing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="github-image"
                src="github-mark.svg"
                alt="Github link"
              />
            </a>
          </div>
          <p>Sign up for your free e-notes account.</p>
          <a className="nav-link" href="/register">
            Sign up
          </a>
        </div>
      ) : (
        <div className="registration-link-container">
          <p>Account created successfully!</p>
          <p>Please log in</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationLink;
