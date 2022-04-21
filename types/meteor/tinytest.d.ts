type AnyObject = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunction = Function;

declare module 'meteor/tinytest' {
  namespace Tinytest {
    interface ILengthAble {
      length: number;
    }

    interface ITinytestAssertions {
      ok(doc: AnyObject): void;
      expect_fail(): void;
      fail(doc: AnyObject): void;
      runId(): string;
      equal<T>(actual: T, expected: T, message?: string, not?: boolean): void;
      notEqual<T>(actual: T, expected: T, message?: string): void;
      instanceOf(obj: AnyObject, klass: AnyFunction, message?: string): void;
      notInstanceOf(obj: AnyObject, klass: AnyFunction, message?: string): void;
      matches(actual: unknown, regexp: RegExp, message?: string): void;
      notMatches(actual: unknown, regexp: RegExp, message?: string): void;
      throws(f: AnyFunction, expected?: string | RegExp): void;
      isTrue(v: boolean, msg?: string): void;
      isFalse(v: boolean, msg?: string): void;
      isNull(v: unknown, msg?: string): void;
      isNotNull(v: unknown, msg?: string): void;
      isUndefined(v: unknown, msg?: string): void;
      isNotUndefined(v: unknown, msg?: string): void;
      isNan(v: unknown, msg?: string): void;
      isNotNan(v: unknown, msg?: string): void;
      include<T>(
        s: Array<T> | AnyObject | string,
        value: unknown,
        msg?: string,
        not?: boolean
      ): void;

      notInclude<T>(
        s: Array<T> | AnyObject | string,
        value: unknown,
        msg?: string,
        not?: boolean
      ): void;
      length(obj: ILengthAble, expected_length: number, msg?: string): void;
      _stringEqual(actual: string, expected: string, msg?: string): void;
    }

    function add(
      description: string,
      func: (test: ITinytestAssertions) => void
    ): void;

    function addAsync(
      description: string,
      func: (test: ITinytestAssertions) => void
    ): void;
  }
}
