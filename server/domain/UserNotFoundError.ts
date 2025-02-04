export class UserNotFoundError extends Error {
  constructor(message: string = "User did not found") {
    super(message);
    this.name = "UserNotFoundError";
  }
}
