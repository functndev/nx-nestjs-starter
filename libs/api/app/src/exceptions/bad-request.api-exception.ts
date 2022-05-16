import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

export class BadRequestApiException extends BaseApiException {
	constructor(errorKey: string, metadata?: Record<string, unknown>) {
		super(HttpStatus.BAD_REQUEST, 'Bad Request', errorKey, metadata);
	}
}
