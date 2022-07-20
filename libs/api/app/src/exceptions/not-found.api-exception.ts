import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { LngFilePath } from '../types';

export class NotFoundApiException extends BaseApiException {
	constructor(
		errorKey: LngFilePath = 'exceptions.not-found',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.NOT_FOUND, 'Bad Request', errorKey, metadata);
	}
}
