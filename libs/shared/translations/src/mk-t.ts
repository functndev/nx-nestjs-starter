// NOTE we currently have only de translations for the FE stuff,
// so if we restrict the type by unifying with the sparse en translations,
// we can't really use it anywhere...
// hence I'm commenting it out for now

import { default as en } from './locales/en.json';

// const strings = { de, en }; // add more locales here
const strings = { en };

type LocaleType = keyof typeof strings;

// type LocaleStringsType = typeof de | typeof en;
type LocaleStringsType = typeof en;

export type I18NKey = keyof NestedObjectType<LocaleStringsType>;

export type TFunction = (
	// key: keyof NestedObjectType<typeof de & typeof en>,
	key: keyof NestedObjectType<typeof en>,
	vars?: Record<string, string | number>,
) => string;

type PropertyAccessor<ObjectType, Key extends keyof ObjectType> = Key extends string
	? ObjectType[Key] extends Record<string, unknown>
		? `${Key}.${PropertyAccessor<ObjectType[Key], keyof ObjectType[Key]>}`
		: Key
	: never;

type NestedObjectType<T> = {
	[K in PropertyAccessor<T, keyof T>]: K extends `${infer Head}.${infer Rest}`
		? Head extends keyof T
			? Rest extends PropertyAccessor<T[Head], keyof T[Head]>
				? NestedObjectType<T[Head]>[Rest]
				: never
			: never
		: K extends keyof T
		? T[K]
		: never;
};

function accessProperty<T, K extends keyof NestedObjectType<T>>(
	obj: T,
	accessor: K | string,
): NestedObjectType<T>[K] | undefined {
	const pathParts = accessor.split('.');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let result: any = obj;

	for (const pathPart of pathParts) {
		if (typeof result === 'object' && result !== null) {
			result = result[pathPart];
		} else {
			return undefined;
		}
	}

	return result as NestedObjectType<T>[K];
}

// replace {{var}} with vars.var
const interpolateString = (
	str: string | undefined,
	vars: Record<string, string | number>,
	strings: LocaleStringsType,
	visitedKeys: Set<string> = new Set<string>(),
): string => {
	const replacedStr = str?.replace(
		/\{\{\s*(\w+)\s*\}\}|\$t\((.*?)\)/g,
		(_, varName, reference) => {
			if (varName) {
				return vars[varName]?.toString() ?? '';
			} else if (reference) {
				const referenceKey = reference.trim();
				if (visitedKeys.has(referenceKey)) {
					// Handle circular references gracefully
					console.warn(
						`Circular reference detected for translation key: "${referenceKey}"`,
					);
					return '';
				}
				visitedKeys.add(referenceKey);

				const property = accessProperty<
					LocaleStringsType,
					keyof NestedObjectType<LocaleStringsType>
				>(strings, referenceKey);
				const resolved = interpolateString(property, vars, strings, visitedKeys);

				visitedKeys.delete(referenceKey); // Remove the key after resolving
				return resolved ?? '';
			}
			return '';
		},
	);

	return replacedStr ?? '';
};

export const mkT =
	(locale: LocaleType) =>
	(
		// key: keyof NestedObjectType<typeof de & typeof en>,
		key: keyof NestedObjectType<typeof en>,
		vars?: Record<string, string | number>,
	) => {
		const visitedKeys: Set<string> = new Set<string>();

		const lng =
			vars?.['lng'] &&
			typeof vars['lng'] === 'string' &&
			Object.keys(strings).includes(vars['lng'])
				? (vars['lng'] as keyof typeof strings)
				: locale;

		try {
			const property = accessProperty(strings[lng], key);
			const interpolatedString = interpolateString(
				property,
				vars ?? {},
				strings[lng],
				visitedKeys,
			);
			return interpolatedString && interpolatedString.length > 0
				? interpolatedString
				: key;
		} catch (e) {
			return key;
		}
	};
