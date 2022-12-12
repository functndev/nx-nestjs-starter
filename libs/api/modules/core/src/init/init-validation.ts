import { ValidationPipe } from '@nestjs/common';

import type { ConfigService } from '@nestjs-starter/api/modules/global';

export const getValidationPipe = (config: ConfigService) =>
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidUnknownValues: config.isProdEnv,
		disableErrorMessages: config.isProdEnv,
	});
