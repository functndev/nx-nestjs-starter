import type { TFunction } from 'i18next';
import type { Request } from 'express';

export type I18nReq = Request & {
	language: string;
	languages?: string[];
	t: TFunction;
};
