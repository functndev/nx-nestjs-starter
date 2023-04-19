import {
	generateFiles,
	getWorkspaceLayout,
	joinPathFragments,
	names,
	offsetFromRoot,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/nest';

import type { Tree } from '@nx/devkit';
import type { LibraryGeneratorOptions } from './schema';

export function getRelativePathToRootFile(
	tree: Tree,
	targetPath: string,
	fileName: string,
): string {
	return offsetFromRoot(targetPath) + fileName;
}

export default async function (tree: Tree, options: LibraryGeneratorOptions) {
	const { libsDir } = getWorkspaceLayout(tree);

	const name = names(options.name).fileName;

	const projectDirectory = options.directory
		? `${names(options.directory).fileName}/${name}`
		: name;

	const projectRoot = joinPathFragments(libsDir, projectDirectory);

	await libraryGenerator(tree, { ...options });

	generateFiles(tree, joinPathFragments(__dirname, './files'), projectRoot, {
		...options,
		rootTsConfigPath: getRelativePathToRootFile(tree, projectRoot, 'tsconfig.base.json'),
		rootEslintRCPath: getRelativePathToRootFile(tree, projectRoot, '.eslintrc.json'),
		name: names(options.name).className,
		tmpl: '',
	});
}
