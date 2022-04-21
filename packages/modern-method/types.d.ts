import type {
  ApplyOptions,
  MethodArgs,
  MethodInvocation,
  MethodName,
  MethodResult,
} from '../../types/meteor/meteor';

// =============
// == Base Types
// =============

/**
 * The name of the underlying Meteor Method.
 */
export type Name = MethodName;

/**
 * Internal. The base type for the arguments of a Modern Method.
 */
export type _Args = MethodArgs;

/**
 * Internal. The base type for the result of a Modern Method.
 */
export type _Result = MethodResult;

/**
 * Internal. ...
 */
export type _RawHandler<TResult extends Result> = (
  invocation: MethodInvocation,
  args: MethodArgs
) => Promise<TResult>;

/**
 * @description :TODO:
 */
export interface Context {
  invocation: MethodInvocation;
  name: Name;
}

/**
 * Handle the invocation of a Modern Method. Supports synchronous and asynchronous functions.
 */
export type Handler<TResult extends Result> = (
  context: Context,
  // Should NOT receive the `TArgs` of the Modern Method.
  args: MethodArgs
) => TResult | Promise<TResult>;

/**
 * @description :TODO:
 */
export type Outcome<TResult extends Result> =
  | { type: 'ok'; result: TResult }
  | { type: 'error'; error: unknown };

// =================
// == Function Types
// =================

/**
 * Invoke a Modern Method. Must be handled asynchronously.
 */
export type Call<TArgs, TResult> = (
  args: TArgs,
  options?: ApplyOptions<TResult>
) => Promise<TResult>;

export type Register<TThis> = () => TThis;

export type SetHandler<TThis> = (fn: Handler<TResult>) => TThis;

export class ModernMethod<TArgs extends _Args, TResult extends _Result> {
  constructor(name: Name): this;
  setHandler: SetHandler<this>;
  register: Register<this>;
  call: Call<TArgs, TResult>;
}
