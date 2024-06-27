import type { TFunction } from '@nestjs-starter/shared/translations';
import type { Request } from 'express';

export type I18nReq = Request & {
	language: string;
	languages?: string[];
	t: TFunction;
};
