type FnType<T = unknown> = (key: string) => T;

export const switchCase =
	<T, K extends string>(cases: Record<K, T>) =>
	(defaultCase: T) =>
	(key: K): T =>
		cases[key] ?? defaultCase;

const isFnType = <T>(value: T | FnType<T>): value is FnType<T> =>
	typeof value === 'function';

const executeIfFunction = <T>(f: T | FnType<T>, key: string): T =>
	isFnType(f) ? f(key) : f;

const bindKeyIfIsFn = <T>(f: T | FnType<T>, key: string) =>
	isFnType(f) ? f.bind(null, key) : f;

export const switchCaseFn =
	<T>(cases: Record<string, T | FnType<T>>) =>
	(defaultCase: T | FnType<T>) =>
	(key: string): T =>
		executeIfFunction(switchCase(cases)(bindKeyIfIsFn(defaultCase, key))(key), key);
