import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { GlobalModule } from '@nestjs-starter/api-shared/modules/global';
import { HealthModule } from '@nestjs-starter/api-shared/modules/health';

import { pinoLoggerConfigOptions } from './util/logger-init';
import { configModuleConfig } from './util/config-init';
import { ConfigService } from './services/config.service';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot(configModuleConfig),
		LoggerModule.forRootAsync(pinoLoggerConfigOptions),
		GlobalModule,
		HealthModule,
	],
	providers: [ConfigService],
})
export class CoreModule {}
