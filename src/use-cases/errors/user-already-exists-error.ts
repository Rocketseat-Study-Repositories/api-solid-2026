export class UserAlreadyExistsError extends Error {
  constructor() {
    super('An user with provided e-mail already registered.');
  }
}
