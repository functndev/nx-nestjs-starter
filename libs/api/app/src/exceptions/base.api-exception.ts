import { HttpException } from '@nestjs/common';

import type { I18NKey } from '@nestjs-starter/shared/translations';
import type { HttpStatus } from '@nestjs/common';

export class BaseApiException extends HttpException {
	readonly i18nKey: I18NKey;
	readonly metadata: Record<string, unknown>;

	constructor(
		statusCode: HttpStatus,
		message: string,
		i18nKey: I18NKey,
		metadata?: Record<string, unknown>,
	) {
		super({ statusCode, message }, statusCode);
		this.i18nKey = i18nKey;
		this.metadata = metadata || {};
	}
}
