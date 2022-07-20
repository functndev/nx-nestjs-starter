export * from './core.module';
export * from './init';

// only expose specific services to the api app
// the app can only import from core

export { ConfigService, PrismaService } from '@nestjs-starter/api/modules/global';

export { en } from '@nestjs-starter/api/app';
