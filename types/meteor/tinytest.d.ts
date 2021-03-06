// eslint-disable-next-line @typescript-eslint/ban-types
type AnyNonNullishValue = Object;
// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunctionLikeValue = Function;

declare module 'meteor/tinytest' {
  namespace Tinytest {
    interface Lengthable {
      length: number;
    }

    interface Assertions {
      ok(doc: AnyNonNullishValue): void;
      expect_fail(): void;
      fail(doc: AnyNonNullishValue): void;
      runId(): string;
      equal<T>(actual: T, expected: T, message?: string, not?: boolean): void;
      notEqual<T>(actual: T, expected: T, message?: string): void;
      instanceOf(
        obj: AnyNonNullishValue,
        klass: AnyFunctionLikeValue,
        message?: string
      ): void;
      notInstanceOf(
        obj: AnyNonNullishValue,
        klass: AnyFunctionLikeValue,
        message?: string
      ): void;
      matches(actual: unknown, regexp: RegExp, message?: string): void;
      notMatches(actual: unknown, regexp: RegExp, message?: string): void;
      throws(f: AnyFunctionLikeValue, expected?: string | RegExp): void;
      isTrue(v: boolean, msg?: string): void;
      isFalse(v: boolean, msg?: string): void;
      isNull(v: unknown, msg?: string): void;
      isNotNull(v: unknown, msg?: string): void;
      isUndefined(v: unknown, msg?: string): void;
      isNotUndefined(v: unknown, msg?: string): void;
      isNan(v: unknown, msg?: string): void;
      isNotNan(v: unknown, msg?: string): void;
      include<T>(
        s: Array<T> | AnyNonNullishValue | string,
        value: unknown,
        msg?: string,
        not?: boolean
      ): void;

      notInclude<T>(
        s: Array<T> | AnyNonNullishValue | string,
        value: unknown,
        msg?: string,
        not?: boolean
      ): void;
      length(obj: Lengthable, expected_length: number, msg?: string): void;
      _stringEqual(actual: string, expected: string, msg?: string): void;
    }

    function add(description: string, func: (test: Assertions) => void): void;

    function addAsync(
      description: string,
      func: (test: Assertions) => void
    ): void;
  }
}
