module.exports = {
	displayName: 'shared-util',
	preset: '../../../jest.preset.ts',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../coverage/libs/shared/util',
};
