import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

export class NotFoundApiException extends BaseApiException {
	constructor(errorKey: string, metadata?: Record<string, unknown>) {
		super(HttpStatus.NOT_FOUND, 'Bad Request', errorKey, metadata);
	}
}
