import { v4 } from 'uuid';

import { ConfigService } from '../services/config.service';

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
