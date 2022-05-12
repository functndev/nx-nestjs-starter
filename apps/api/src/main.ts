import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { default as helmet } from 'helmet';
import { default as cookieParser } from 'cookie-parser';
import { performance } from 'perf_hooks';

import { ConfigService, PrismaService } from '@nestjs-starter/api/modules/global';
import {
	getValidationPipe,
	i18nMiddleware,
	initI18n,
} from '@nestjs-starter/api/modules/core';

import { AppModule } from './app/app.module';

import en from './assets/en.json';

const now = performance.now();

initI18n({ en });

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });

	const config = app.get(ConfigService);
	const logger = app.get(Logger);
	const prisma = app.get(PrismaService);

	prisma.enableShutdownHooks(app);

	app.useLogger(logger);
	app.use(helmet());
	app.use(cookieParser());
	app.useGlobalPipes(getValidationPipe(config));
	app.use(i18nMiddleware);

	await app.listen(config.port);

	logger.log(`App running in [${config.nodeEnv}] mode`);
	logger.log(`Listening at: ${await app.getUrl()}`);
	logger.log(`App took ${Math.round(performance.now() - now)}ms to start.`);
}

bootstrap();
