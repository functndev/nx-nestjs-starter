import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { I18NKey } from '@nestjs-starter/shared/translations';

export class ForbiddenApiException extends BaseApiException {
	constructor(
		errorKey: I18NKey = 'exceptions.forbidden',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.FORBIDDEN, 'Bad Request', errorKey, metadata);
	}
}
