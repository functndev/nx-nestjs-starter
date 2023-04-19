import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration } from '@nx/devkit';

import generator from './generator';

import type { LibraryGeneratorOptions } from './schema';
import type { Tree } from '@nx/devkit';

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
});
