export * from './core.module';

// only expose specific services to the api app
// the app can only import from core

export { ConfigService, PrismaService } from '@nestjs-starter/api/modules/global';

export {
	getValidationPipe,
	initI18n,
	i18nMiddleware,
	initExpressSession,
} from '@nestjs-starter/api/app';
