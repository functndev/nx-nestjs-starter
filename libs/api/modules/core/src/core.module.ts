import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HealthModule } from '@nestjs-starter/api/modules/health';
import { GlobalModule } from '@nestjs-starter/api/modules/global';

import {
	ConfigModuleImport,
	GlobalExceptionFilterProvider,
	pinoLoggerConfigOptions,
} from './init';

@Module({
	imports: [
		ConfigModuleImport,
		LoggerModule.forRootAsync(pinoLoggerConfigOptions),
		GlobalModule,
		HealthModule,
	],
	providers: [GlobalExceptionFilterProvider],
})
export class CoreModule {}
