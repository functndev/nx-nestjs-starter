import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { LngFilePath } from '../types';

export class UnauthorizedApiException extends BaseApiException {
	constructor(
		errorKey: LngFilePath = 'exceptions.unauthorized',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.UNAUTHORIZED, 'Bad Request', errorKey, metadata);
	}
}
