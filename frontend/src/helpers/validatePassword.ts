const validatePassword = (password: string): boolean => {
  // Regular expression to check if password is at least 8 characters
  // and contains at least one special character
  const regex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return regex.test(password);
};

export default validatePassword;
