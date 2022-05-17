import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

export class UnauthorizedApiException extends BaseApiException {
	constructor(errorKey: string, metadata?: Record<string, unknown>) {
		super(HttpStatus.UNAUTHORIZED, 'Bad Request', errorKey, metadata);
	}
}
