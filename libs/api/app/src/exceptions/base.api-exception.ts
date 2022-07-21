import { HttpException } from '@nestjs/common';

import type { LngFilePath } from '../types';
import type { HttpStatus } from '@nestjs/common';

export class BaseApiException extends HttpException {
	readonly i18nKeys: LngFilePath[];
	readonly metadata: Record<string, unknown>;

	constructor(
		statusCode: HttpStatus,
		message: string,
		i18nKey: LngFilePath | LngFilePath[],
		metadata?: Record<string, unknown>,
	) {
		super({ statusCode, message }, statusCode);
		this.i18nKeys = Array.isArray(i18nKey) ? i18nKey : [i18nKey];
		this.metadata = metadata || {};
	}
}
