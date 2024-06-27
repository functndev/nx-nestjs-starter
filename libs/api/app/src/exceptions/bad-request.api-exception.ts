import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { I18NKey } from '@nestjs-starter/shared/translations';

export class BadRequestApiException extends BaseApiException {
	constructor(
		errorKey: I18NKey = 'exceptions.bad-request',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.BAD_REQUEST, 'Bad Request', errorKey, metadata);
	}
}
