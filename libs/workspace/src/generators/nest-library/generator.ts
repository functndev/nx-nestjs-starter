import {
	generateFiles,
	getWorkspaceLayout,
	joinPathFragments,
	names,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/nest';

import type { Tree } from '@nrwl/devkit';
import type { LibraryGeneratorOptions } from './schema';

export default async function (tree: Tree, options: LibraryGeneratorOptions) {
	const { libsDir } = getWorkspaceLayout(tree);

	const name = names(options.name).fileName;

	const projectDirectory = options.directory
		? `${names(options.directory).fileName}/${name}`
		: name;

	const projectRoot = joinPathFragments(libsDir, projectDirectory);

	const tags = `scope:backend`;

	await libraryGenerator(tree, { ...options, tags });

	generateFiles(tree, joinPathFragments(__dirname, './files'), projectRoot, {
		...options,
		name: names(options.name).className,
		tmpl: '',
	});
}
