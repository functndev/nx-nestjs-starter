import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

import type { LibraryGeneratorOptions } from './schema';
import type { Tree } from '@nrwl/devkit';

describe('nest-library generator', () => {
	let appTree: Tree;
	const options: LibraryGeneratorOptions = { name: 'test' };

	beforeEach(() => {
		appTree = createTreeWithEmptyWorkspace();
	});

	it('should run successfully', async () => {
		await generator(appTree, options);
		const config = readProjectConfiguration(appTree, 'test');
		expect(config).toBeDefined();
	});

	it('should create modified .eslintrc.json file', async () => {
		await generator(appTree, options);
		const eslintrc = appTree.read('libs/test/.eslintrc.json');
		expect(eslintrc?.toString()).toMatchInlineSnapshot(`
		"{
			\\"extends\\": [\\"../../../../.eslintrc.json\\"],
			\\"ignorePatterns\\": [\\"!**/*\\"],
			\\"overrides\\": [
				{
					\\"parserOptions\\": {
						\\"emitDecoratorMetadata\\": true
					},
					\\"files\\": [\\"*.ts\\", \\"*.tsx\\", \\"*.js\\", \\"*.jsx\\"],
					\\"rules\\": {}
				},
				{
					\\"files\\": [\\"*.ts\\", \\"*.tsx\\"],
					\\"rules\\": {}
				},
				{
					\\"files\\": [\\"*.js\\", \\"*.jsx\\"],
					\\"rules\\": {}
				}
			]
		}
		"
	`);
	});
});
