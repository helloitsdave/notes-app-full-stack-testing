const RegistrationLink = (props: { onRegister: boolean }) => {
  return (
    <div>
      <div className="registration-link">
        <h1>e-notes</h1>
      </div>
      {!props.onRegister ? (
        <div className="registration-link-container">
          <p>Welcome to the e-notes app</p>
          <p>Sign up for your free account</p>
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
