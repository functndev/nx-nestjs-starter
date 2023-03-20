import { Global, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
	providers: [ConfigService, PrismaService],
	exports: [ConfigService, PrismaService],
})
export class GlobalModule {}
