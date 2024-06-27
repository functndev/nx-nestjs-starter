import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { I18NKey } from '@nestjs-starter/shared/translations';

export class NotFoundApiException extends BaseApiException {
	constructor(
		errorKey: I18NKey = 'exceptions.not-found',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.NOT_FOUND, 'Bad Request', errorKey, metadata);
	}
}
