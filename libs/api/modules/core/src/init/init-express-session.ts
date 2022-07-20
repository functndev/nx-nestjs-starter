import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { default as session } from 'express-session';

import type { PrismaService, ConfigService } from '@nestjs-starter/api/modules/global';

export const initExpressSession = (config: ConfigService, prisma: PrismaService) =>
	session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	});
