import { Meteor } from '@types/meteor/meteor';
import { EJSONable, EJSONableProperty } from 'meteor/ejson';

/** The Method invocation object (e.g. `this` in a typical Meteor.methods definition). */
export type MethodInvocation = Meteor.MethodThisType;

type MethodArg = EJSONable | EJSONableProperty;

/** The arguments of a Method call. */
export type MethodArgs = ReadonlyArray<MethodArg>;

/** The result of a Method call. */
export type MethodResult =
  | EJSONable
  | EJSONable[]
  | EJSONableProperty
  | EJSONableProperty[];

/** Optional settings to control how the client executes the Method. */
export type ApplyOptions<TResult> = {
  /**
   * If true, don't send this method until all previous method calls have completed, and don't send any subsequent method calls until this one is completed.
   * @locus Client
   */
  wait?: boolean;
  /**
   * This callback is invoked with the error or result of the method (just like `asyncCallback`) as soon as the error or result is available. The local cache may not yet reflect the writes performed by the method.
   * @locus Client
   */
  onResultReceived?: (
    error: Error | Meteor.Error | undefined,
    result?: TResult
  ) => void;
  /**
   * If true, don't send this method again on reload, simply call the callback an error with the error code 'invocation-failed'.
   * @locus Client
   */
  noRetry?: boolean;
  /**
   * If true, exceptions thrown by method stubs will be thrown instead of logged, and the method will not be invoked on the server.
   * @locus Client
   */
  returnStubValue?: boolean;
  /**
   * If true then in cases where we would have otherwise discarded the stub's return value and returned undefined, instead we go ahead and return it. Specifically, this is any time other than when (a) we are already inside a stub or (b) we are in Node and no callback was provided. Currently we require this flag to be explicitly passed to reduce the likelihood that stub return values will be confused with server return values; we may improve this in future.
   * @locus Client
   */
  throwStubExceptions?: boolean;
};

/** The name of the Method. */
export type MethodName = string;
