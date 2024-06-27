import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { I18NKey } from '@nestjs-starter/shared/translations';

export class UnauthorizedApiException extends BaseApiException {
	constructor(
		errorKey: I18NKey = 'exceptions.unauthorized',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.UNAUTHORIZED, 'Bad Request', errorKey, metadata);
	}
}
