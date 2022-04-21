import { Meteor } from 'meteor/meteor';
import type {
  _Args,
  _RawHandler,
  _Result,
  Call,
  Context,
  Handler,
  Name,
  Outcome,
  SetHandler,
  ModernMethod as TModernMethod,
  Register,
} from './types';

/**
 * Define Meteor Methods in a modern way.
 */
export class ModernMethod<TArgs extends _Args, TResult extends _Result>
  implements TModernMethod<TArgs, TResult>
{
  _name: Name;
  _handler: null | Handler<TResult>;
  _hasSetHandler: boolean;
  _isRegistered: boolean;

  /**
   * Construct a Modern Method.
   * @param name The name of the underlying Meteor Method.
   */
  constructor(name: Name) {
    // js-guard
    // empty string passes type but should be rejected
    if (!name) {
      throw new Error(
        'Missing required parameter: "name" while constructing new Method.'
      );
    }

    this._name = name;
    this._handler = null;
    this._hasSetHandler = false;
    this._isRegistered = false;

    Meteor.startup(() => {
      if (Meteor.isServer) {
        this._checkRegistered();
      }
    });

    return this;
  }

  /**
   * Define the main function to handle a client calling this Method.
   * @throws {Error} When the handler is already set.
   */
  setHandler: SetHandler<this> = (fn) => {
    if (this._hasSetHandler) {
      throw new Error(
        `Unexpected call: setHandler() has already been called for Method "${this._name}".`
      );
    }

    this._handler = fn;
    this._hasSetHandler = true;

    return this;
  };

  /**
   * Internal. Ensure the handler.
   * @throws {Error} When the handler is not set.
   * @returns The handler.
   */
  _ensureHandler = (): Handler<TResult> => {
    if (this._handler === null) {
      throw new Error(
        `Missing expected property: handler is not set for Method "${this._name}".`
      );
    }

    return this._handler;
  };

  /**
   * Register the Method for invocation over the network by clients.
   * @throws {Error} When the Method is already registered.
   */
  register: Register<this> = () => {
    if (this._isRegistered) {
      throw new Error(
        `Unexpected registration: register() has already been called for Method "${this._name}".`
      );
    }

    const handler = this._ensureHandler();

    // defined in isolation from Meteor.method so aliasing `this` is not necessary
    const rawHandler: _RawHandler<TResult> = async (invocation, rawArgs) => {
      const context: Context = { invocation, name: this._name };

      let outcome: Outcome<TResult>;
      try {
        const result = await handler(context, rawArgs);
        outcome = { type: 'ok', result };
      } catch (error) {
        outcome = { type: 'error', error };
      }

      if (outcome.type === 'error') {
        throw outcome.error;
      }

      return outcome.result;
    };

    Meteor.methods({
      [this._name](...args) {
        return rawHandler(this, args);
      },
    });

    this._isRegistered = true;

    return this;
  };

  /**
   * Internal. Check the Method is registered.
   * @throws {Error} When the Method is not registered.
   */
  _checkRegistered = (): void => {
    if (!this._isRegistered) {
      throw new Error(
        `Missing expected registration: must call register() before Meteor.startup for Method "${this._name}".`
      );
    }
  };

  /**
   * Invoke the Method.
   * @throws {Error|Meteor.Error}
   */
  call: Call<TArgs, TResult> = async (args, options = {}) => {
    return await new Promise((resolve, reject) => {
      Meteor.apply(this._name, [args], options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as TResult);
        }
      });
    });
  };
}
