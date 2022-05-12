import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthModule } from '@nestjs-starter/api/modules/health';
import { GlobalModule } from '@nestjs-starter/api/modules/global';

import { pinoLoggerConfigOptions } from './util/logger-init';

@Module({
	imports: [
		LoggerModule.forRootAsync(pinoLoggerConfigOptions),
		GlobalModule,
		HealthModule,
	],
})
export class CoreModule {}
