export * from './util/init-validation';
export * from './util/init-i18n';
export * from './util/init-express-session';

export * from './core.module';

// only expose specific services to the api app
// the app can only import from core
export { ConfigService, PrismaService } from '@nestjs-starter/api/modules/global';
