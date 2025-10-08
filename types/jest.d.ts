/// <reference types="jest" />

declare global {
  var describe: jest.Describe;
  var it: jest.It;
  var test: jest.It;
  var expect: jest.Expect;
  var beforeAll: jest.Lifecycle;
  var beforeEach: jest.Lifecycle;
  var afterAll: jest.Lifecycle;
  var afterEach: jest.Lifecycle;

  namespace jest {
    interface Jest {
      fn: typeof jest.fn;
    }
  }

  var jest: jest.Jest & {
    fn: <T extends (...args: unknown[]) => unknown>(
      implementation?: T
    ) => jest.MockedFunction<T>;
  };
}

export {};
