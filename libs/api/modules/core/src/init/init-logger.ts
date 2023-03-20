import { v4 } from 'uuid';

import { ConfigService } from '@nestjs-starter/api/modules/global';
import { switchCase } from '@nestjs-starter/shared/util';

import type { LoggerModuleAsyncParams } from 'nestjs-pino';

const severity = switchCase<string, string>({
	['trace']: 'DEBUG',
	['debug']: 'DEBUG',
	['info']: 'INFO',
	['warn']: 'WARNING',
	['error']: 'ERROR',
	['fatal']: 'CRITICAL',
})('DEFAULT');

const level = (label: string, level: number) => ({ severity: severity(label), level });

export const pinoLoggerConfigOptions: LoggerModuleAsyncParams = {
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		pinoHttp: {
			formatters: { level },
			transport: config.isDevEnv ? { target: 'pino-pretty' } : { target: 'pino/file' },
			genReqId: () => v4(),
			level: 'debug',
			redact: {
				paths: ['req.headers.cookie', 'res.headers["set-cookie"]'],
			},
			quietReqLogger: true,
			serializers: config.isDevEnv
				? {
						req: (req) => ({
							url: req.url,
						}),
						res: (res) => ({
							statusCode: res.statusCode,
						}),
				  }
				: undefined,
		},
	}),
};
