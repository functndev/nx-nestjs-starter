import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { default as basicAuth } from 'express-basic-auth';

import type { ConfigService } from '@nestjs-starter/api/modules/global';
import type { INestApplication } from '@nestjs/common';

export const initSwaggerModule = (
	app: INestApplication,
	{ isProdEnv, swaggerAuth }: ConfigService,
): void => {
	if (isProdEnv)
		app.use(
			'/api-docs*',
			basicAuth({
				challenge: true,
				users: swaggerAuth,
			}),
		);

	const options = new DocumentBuilder()
		.setTitle('nestjs-starter')
		.setDescription('nestjs-starter description')
		// version should probably not be the current date
		.setVersion(Date.now().toString())
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api-docs', app, document);
};
