import { v4 } from 'uuid';

import { ConfigService } from '@nestjs-starter/api/modules/global';

import type { LoggerModuleAsyncParams } from 'nestjs-pino';

export const pinoLoggerConfigOptions: LoggerModuleAsyncParams = {
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		pinoHttp: {
			transport: config.isDevEnv ? { target: 'pino-pretty' } : undefined,
			genReqId: () => v4(),
			level: 'debug',
			redact: {
				paths: ['req.headers.cookie', 'res.headers["set-cookie"]'],
			},
		},
	}),
};
