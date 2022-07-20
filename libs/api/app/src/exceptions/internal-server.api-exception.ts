import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { LngFilePath } from '../types';

export class InternalServerApiException extends BaseApiException {
	constructor(
		errorKey: LngFilePath = 'exceptions.internal-server-error',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, 'Bad Request', errorKey, metadata);
	}
}
