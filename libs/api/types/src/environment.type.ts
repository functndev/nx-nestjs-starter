export type EnvironmentType = {
	NODE_ENV: 'development' | 'production';
	PORT: number;

	SECRET: string;
	SESSION_SECRET: string;

	SWAGGER_USER: string;
	SWAGGER_PW: string;
};
