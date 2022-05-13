import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configModuleConfig } from './util/config-init';
import { ConfigService } from './services/config.service';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
	imports: [ConfigModule.forRoot(configModuleConfig)],
	providers: [ConfigService, PrismaService],
	exports: [ConfigService, PrismaService],
})
export class GlobalModule {}
