import Joi from 'joi';

import type { ConfigModuleOptions } from '@nestjs/config';
import type { EnvironmentType } from '@nestjs-starter/api-shared/types';

export const configModuleConfig: ConfigModuleOptions = {
	isGlobal: true,
	cache: true,
	validationSchema: Joi.object<EnvironmentType, true>({
		NODE_ENV: Joi.string()
			.valid('development', 'production')
			.default('development'),
		PORT: Joi.number().default(8080),

		SECRET: Joi.string().required(),
		SESSION_SECRET: Joi.string().required(),

		SWAGGER_USER: Joi.string().required(),
		SWAGGER_PW: Joi.string().required(),
	}),
};
