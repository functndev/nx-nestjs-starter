import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

export class ForbiddenApiException extends BaseApiException {
	constructor(errorKey: string, metadata?: Record<string, unknown>) {
		super(HttpStatus.FORBIDDEN, 'Bad Request', errorKey, metadata);
	}
}
