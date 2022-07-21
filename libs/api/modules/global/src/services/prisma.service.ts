import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import type { INestApplication, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	public async onModuleInit() {
		await this.$connect();
	}

	public enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
