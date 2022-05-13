import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthModule } from '@nestjs-starter/api/modules/health';
import { GlobalModule } from '@nestjs-starter/api/modules/global';
import { pinoLoggerConfigOptions } from '@nestjs-starter/api/app';

@Module({
	imports: [
		LoggerModule.forRootAsync(pinoLoggerConfigOptions),
		GlobalModule,
		HealthModule,
	],
})
export class CoreModule {}
