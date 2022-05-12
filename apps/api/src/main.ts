import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ConfigService, PrismaService } from '@nestjs-starter/api/modules/global';

import { AppModule } from './app/app.module';
import { performance } from 'perf_hooks';

const now = performance.now();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });

	const config = app.get(ConfigService);
	const logger = app.get(Logger);
	const prisma = app.get(PrismaService);

	prisma.enableShutdownHooks(app);

	app.useLogger(logger);

	await app.listen(config.port);

	logger.log(`App running in [${config.nodeEnv}] mode`);
	logger.log(`Listening at: ${await app.getUrl()}`);
	logger.log(`App took ${Math.round(performance.now() - now)}ms to start.`);
}

bootstrap();
