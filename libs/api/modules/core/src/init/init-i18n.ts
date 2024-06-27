import { mkT } from '@nestjs-starter/shared/translations';

import type { Request, Response, NextFunction } from 'express';

export const i18nMiddleware = (req: Request, res: Response, next: NextFunction) => {
	// detect language
	const detectedLang = detectLanguage(req);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	req.t = mkT(detectedLang || 'en');
	next();
};

const detectLanguage = (req: Request): string => {
	// Check Accept-Language header
	if (req.headers['accept-language']) {
		const acceptedLanguages = req.headers['accept-language'].split(',');
		if (acceptedLanguages.length > 0) {
			return acceptedLanguages?.[0]?.split(';')[0] || 'en';
		}
	}

	// Default language
	return 'en';
};
