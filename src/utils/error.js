/**
 * Error extending only works in real ES6 environments (stack trace
 * without subclass constructor, etc.). Since Error constructor returns
 * new instance (not one referenced with this), instanceof operator won't
 * work for subclasses.
 * For more info see: https://github.com/babel/babel/issues/3083
 */
export class ExtendableError {
  constructor(message) {
    this.message = message
    this.name = this.constructor.name
    this.stack = (new Error(message)).stack
  }
}

export class WronglyResolvedPromise extends ExtendableError {}
