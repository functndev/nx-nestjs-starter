import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { I18NKey } from '@nestjs-starter/shared/translations';

export class InternalServerApiException extends BaseApiException {
	constructor(
		errorKey: I18NKey = 'exceptions.internal-server-error',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, 'Bad Request', errorKey, metadata);
	}
}
