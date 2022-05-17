import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

export class InternalServerApiException extends BaseApiException {
	constructor(errorKey: string, metadata?: Record<string, unknown>) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, 'Bad Request', errorKey, metadata);
	}
}
