type Primitive = string | number | symbol;

type GenericObject = Record<Primitive, unknown>;

type Join<L extends Primitive | undefined, R extends Primitive | undefined> = L extends
	| string
	| number
	? R extends string | number
		? `${L}.${R}`
		: L
	: R extends string | number
	? R
	: undefined;

type Union<
	L extends unknown | undefined,
	R extends unknown | undefined,
> = L extends undefined
	? R extends undefined
		? undefined
		: R
	: R extends undefined
	? L
	: L | R;

export type NestedPaths<
	T extends GenericObject,
	Prev extends Primitive | undefined = undefined,
	Path extends Primitive | undefined = undefined,
> = {
	[K in keyof T]: T[K] extends GenericObject
		? NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>>
		: Union<Union<Prev, Path>, Join<Path, K>>;
}[keyof T];
