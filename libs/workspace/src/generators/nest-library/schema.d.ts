import type { Linter } from '@nx/linter';

export interface LibraryGeneratorOptions {
	name: string;
	buildable?: boolean;
	controller?: boolean;
	directory?: string;
	global?: boolean;
	importPath?: string;
	linter?: Linter;
	publishable?: boolean;
	service?: boolean;
	skipFormat?: boolean;
	skipTsConfig?: boolean;
	strict?: boolean;
	tags?: string;
	target?:
		| 'es5'
		| 'es6'
		| 'esnext'
		| 'es2015'
		| 'es2016'
		| 'es2017'
		| 'es2018'
		| 'es2019'
		| 'es2020';
	testEnvironment?: 'jsdom' | 'node';
	unitTestRunner?: 'jest' | 'none';
	standaloneConfig?: boolean;
	setParserOptionsProject?: boolean;
}

export interface NormalizedOptions extends LibraryGeneratorOptions {
	fileName: string;
	parsedTags: string[];
	prefix: string;
	projectDirectory: string;
	projectName: string;
	projectRoot: Path;
}
