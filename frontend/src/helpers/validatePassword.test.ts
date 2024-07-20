import validatePassword from './validatePassword';

describe('validatePassword', () => {
  it('should return true if password meets requirements', () => {
    expect(validatePassword('password$')).toBe(true);
  });
  it('should return true for long character string with special characters', () => {
    expect(validatePassword('Pass*word'.repeat(25))).toBe(true);
  });
  it('should return false if password is less than 8 characters', () => {
    expect(validatePassword('passwo!')).toBe(false);
  });
  it('should return false if password does not contain special character', () => {
    expect(validatePassword('password')).toBe(false);
  });
  it('should return false if no characters are present', () => {
    expect(validatePassword('')).toBe(false);
  });
});
