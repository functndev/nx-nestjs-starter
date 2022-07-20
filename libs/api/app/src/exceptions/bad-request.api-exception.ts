import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { LngFilePath } from '../types';

export class BadRequestApiException extends BaseApiException {
	constructor(
		errorKey: LngFilePath = 'exceptions.bad-request',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.BAD_REQUEST, 'Bad Request', errorKey, metadata);
	}
}
