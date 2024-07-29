import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { default as helmet } from 'helmet';
import { default as cookieParser } from 'cookie-parser';
import { performance } from 'perf_hooks';
import { VersioningType } from '@nestjs/common';

import {
	ConfigService,
	getValidationPipe,
	i18nMiddleware,
	initExpressSession,
	PrismaService,
	initSwaggerModule,
} from '@nestjs-starter/api/modules/core';

import { AppModule } from './app/app.module';

const now = performance.now();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	const config = app.get(ConfigService);
	const logger = app.get(Logger);
	const prisma = app.get(PrismaService);

	app.useLogger(logger);
	app.use(helmet());
	app.use(cookieParser());
	app.useGlobalPipes(getValidationPipe(config));
	app.use(i18nMiddleware);
	app.use(initExpressSession(config, prisma));

	app.setGlobalPrefix('api');

	initSwaggerModule(app, config);

	await app.listen(config.port);

	logger.log(`App running in [${config.nodeEnv}] mode`);
	logger.log(`Listening at: ${await app.getUrl()}`);
	logger.debug(`App took ${Math.round(performance.now() - now)}ms to start.`);
}

bootstrap();
