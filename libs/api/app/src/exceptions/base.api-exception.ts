import { HttpException } from '@nestjs/common';

import type { HttpStatus } from '@nestjs/common';

export class BaseApiException extends HttpException {
	public readonly i18nKeys: string[];
	public readonly metadata: Record<string, unknown>;

	constructor(
		statusCode: HttpStatus,
		message: string,
		i18nKey: string | string[],
		metadata?: Record<string, unknown>,
	) {
		super({ statusCode, message }, statusCode);
		this.i18nKeys = Array.isArray(i18nKey) ? i18nKey : [i18nKey];
		this.metadata = metadata || {};
	}
}
