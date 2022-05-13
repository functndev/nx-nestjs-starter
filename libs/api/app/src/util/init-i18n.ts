import { TFunction, default as i18next } from 'i18next';
import { default as middleware } from 'i18next-http-middleware';

import type { Resource } from 'i18next';

export const initI18n = (resources: Resource): Promise<TFunction> =>
	i18next.use(middleware.LanguageDetector).init({
		resources,
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
	});

export const i18nMiddleware = middleware.handle(i18next);
